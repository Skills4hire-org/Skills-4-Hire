import {
  createConversation,
  createMessage,
  getConversationList,
  getMessages,
} from '@/api/chat'
import type {
  Conversation,
  CreateConversation,
  Message,
} from '@/types/chat.types'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useEffect, useRef } from 'react'
import { queryClient } from '@/utils/queryClientConfig'
import { store } from '@/store'
import { useNotificationSeenContext } from '@/contexts/notification-seen'

export const useCreateConversation = () => {
  const createConversationAction = async (data: CreateConversation) => {
    try {
      const response = await createConversation(data)
      return response
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : ''

      if (message.toLowerCase().includes('conversation already exists')) {
        const conversationsPage = await getConversationList()
        const existingConversation = conversationsPage?.results?.find(
          (conversation: Conversation) =>
            conversation.participant_two?.user_id === data.participant_two_id,
        )

        if (existingConversation) return existingConversation
      }

      toast.error(error instanceof Error ? error.message : 'Unable to open conversation')
      throw error
    }
  }

  const createConversationFunction = useMutation({
    mutationFn: createConversationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  return createConversationFunction
}
export const useCreateMessage = () => {
  return useMutation({
    mutationFn: async ({
      conversation_id,
      data,
    }: {
      conversation_id: string
      data: {
        content: string
      }
    }) => {
      try {
        const response = await createMessage({
          conversation_id,
          data,
        })

        return response
      } catch (error: unknown) {
        throw new Error(
          error instanceof Error ? error.message : 'Unable to send message',
        )
      }
    },
  })
}

export const useConversations = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['conversations'],
    queryFn: ({ pageParam }) => getConversationList(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
    refetchInterval: 30000,
  })

  return queryData
}

export const useUnreadMessageCount = () => {
  const { lastSeen } = useNotificationSeenContext()
  const query = useConversations()
  const conversations: Conversation[] =
    query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const filtered = lastSeen.messages > 0
    ? conversations.filter((convo) => {
        const normalized = convo.updated_at.trim().replace(' ', 'T')
        const hasTimezone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(normalized)
        const time = new Date(hasTimezone ? normalized : `${normalized}Z`).getTime()
        return !Number.isNaN(time) && time > lastSeen.messages
      })
    : conversations
  const count = filtered.reduce(
    (sum, convo) => sum + Number(convo.unread_count ?? 0),
    0,
  )
  return { ...query, count }
}

export const useMessages = ({
  conversation_id,
}: {
  conversation_id: string | undefined
}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['messages', conversation_id],
    queryFn: ({ pageParam }) => getMessages({ pageParam, conversation_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
    enabled: !!conversation_id,
  })
  return queryData
}

export const useChatSocket = (
  conversationId: string,
  onMessage: (data: Message) => void,
) => {
  const socketRef = useRef<WebSocket | null>(null)

  const state = store.getState()
  const accessToken = state.userState.access

  useEffect(() => {
    if (!conversationId || !accessToken) return

    const baseUrl = new URL(import.meta.env.VITE_API_BASE_URL)

    baseUrl.protocol = baseUrl.protocol === 'https:' ? 'wss:' : 'ws:'

    const wsUrl =
      `${baseUrl.toString().replace(/\/$/, '')}` +
      `/ws/chats/${encodeURIComponent(conversationId)}/` +
      `?token=${encodeURIComponent(accessToken)}`

    const ws = new WebSocket(wsUrl)

    socketRef.current = ws

    ws.onopen = () => {
      console.log('🟢 WebSocket connected')
    }

    ws.onmessage = (event) => {
      console.log('📨 WebSocket message:', event.data)

      try {
        const data = JSON.parse(event.data)

        console.log('Parsed data:', data)

        if (data.event === 'message' && data.message) {
          onMessage(data.message)
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error(' WebSocket error:', error)
    }

    ws.onclose = (event) => {
      console.log(' WebSocket closed')
      console.log('Close code:', event.code)
      console.log('Close reason:', event.reason)
    }

    return () => {
      console.log('Cleaning up WebSocket')
      ws.close()
    }
  }, [conversationId, accessToken, onMessage])

  const sendSocketMessage = (data: unknown) => {
    const ws = socketRef.current

    if (!ws) {
      console.error('WebSocket is not initialized')
      return false
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not open. Ready state:', ws.readyState)
      return false
    }

    ws.send(JSON.stringify(data))

    return true
  }

  return {
    socketRef,
    sendSocketMessage,
  }
}

export const updateConversationList = (incomingMessage: Message) => {
  queryClient.setQueryData(
    ['conversations'],
    (
      old:
        | {
            pages: Array<{
              results: Conversation[]
              next?: string | null
            }>
            pageParams: unknown[]
          }
        | undefined,
    ) => {
      if (!old) return old

      const updatedPages = old.pages.map((page) => {
        const updated = page.results.map((conv) => {
          if (conv.conversation_id !== incomingMessage.conversation) {
            return conv
          }

          const isNewMessage =
            conv.last_message?.message_id !== incomingMessage.message_id

          return {
            ...conv,

            last_message: {
              message_id: incomingMessage.message_id,
              content: incomingMessage.content,
              created_at: incomingMessage.created_at,
              is_read: incomingMessage.is_read,
            },

            updated_at: incomingMessage.created_at,

            message_count: isNewMessage
              ? (conv.message_count ?? 0) + 1
              : conv.message_count,
          }
        })

        const sortUpdated = [...updated].sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )

        return {
          ...page,
          results: sortUpdated,
        }
      })

      return {
        ...old,
        pages: updatedPages,
      }
    },
  )
}

export const updateMessage = (
  incomingMessage: Message,
  conversation_id: string,
) => {
  queryClient.setQueryData(
    ['messages', conversation_id],
    (
      old:
        | {
            pages: Array<{
              results: Message[]
              next?: string | null
            }>
            pageParams: unknown[]
          }
        | undefined,
    ) => {
      if (!old) return old

      const firstPage = old.pages[0]

      if (!firstPage) return old

      const messageExists = firstPage.results.some(
        (message) => message.message_id === incomingMessage.message_id,
      )

      if (messageExists) {
        return old
      }

      return {
        ...old,
        pages: [
          {
            ...firstPage,
            results: [...firstPage.results, incomingMessage],
          },
          ...old.pages.slice(1),
        ],
      }
    },
  )
}
