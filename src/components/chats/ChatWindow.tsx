import { useCallback, useEffect, useRef } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { useSelector } from 'react-redux'
import { useIsChatMobile } from '@/hooks/use-mobile'
import { ChevronLeft } from 'lucide-react'
import ProfileImage from '../global/ProfileImage'
import type { UserType } from '@/utils/types'
import {
  markConversationAsReadInCache,
  updateConversationList,
  updateMessage,
  useChatSocket,
  useMessages,
} from '@/hooks/useChats'
import type { Message, User } from '@/types/chat.types'
import ProposePriceDialog from './ProposePriceDialog'
import NegotiatePriceDialog from './NegotiatePriceDialog'
import AgreementDialog from './AgreementDialog'
import Loading from '../global/Loading'
import Error from '../global/Error'

export default function ChatWindow() {
  const { conversationId: conversation_id } = useParams()
  const location = useLocation()

  const receiver: {
    participant_two: User
  } = location.state

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
  } = useMessages({
    conversation_id,
  })

  const messages: Message[] = data?.pages.flatMap((page) => page.results) ?? []
  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const isLoadingOlderMessagesRef = useRef(false)

  const previousScrollHeightRef = useRef<number | null>(null)

  const previousScrollTopRef = useRef<number | null>(null)

  const latestMessageId = sortedMessages[sortedMessages.length - 1]?.message_id

  useEffect(() => {
    if (!latestMessageId) return

    if (isLoadingOlderMessagesRef.current) {
      return
    }

    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [latestMessageId])

  useEffect(() => {
    if (!isLoadingOlderMessagesRef.current) {
      return
    }

    const container = containerRef.current

    if (
      !container ||
      previousScrollHeightRef.current === null ||
      previousScrollTopRef.current === null
    ) {
      return
    }

    const newScrollHeight = container.scrollHeight

    const scrollHeightDifference =
      newScrollHeight - previousScrollHeightRef.current

    container.scrollTop = previousScrollTopRef.current + scrollHeightDifference

    previousScrollHeightRef.current = null
    previousScrollTopRef.current = null
    isLoadingOlderMessagesRef.current = false
  }, [data])

  useEffect(() => {
    if (!conversation_id) return

    markConversationAsReadInCache(conversation_id)
  }, [conversation_id])

  const handleSocketMessage = useCallback(
    (incomingMessage: Message) => {
      updateMessage(incomingMessage, conversation_id!)

      updateConversationList(incomingMessage, conversation_id!)
    },
    [conversation_id],
  )

  const { sendSocketMessage } = useChatSocket(
    conversation_id!,
    handleSocketMessage,
  )

  const isMobile = useIsChatMobile()

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const handleMessageFetchingError = () => {
    refetch()
  }

  const getDateKey = (dateString: string) => {
    const date = new Date(dateString)

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`
  }

  const getDateLabel = (dateString: string) => {
    const messageDate = new Date(dateString)
    const today = new Date()

    const messageKey = getDateKey(messageDate.toString())
    const todayKey = getDateKey(today.toString())

    if (messageKey === todayKey) {
      return 'Today'
    }

    const yesterday = new Date(today)

    yesterday.setDate(today.getDate() - 1)

    const yesterdayKey = getDateKey(yesterday.toString())

    if (messageKey === yesterdayKey) {
      return 'Yesterday'
    }

    return messageDate.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleScroll = async () => {
    const container = containerRef.current

    if (!container) return

    const isNearTop = container.scrollTop < 100

    if (isNearTop && hasNextPage && !isFetchingNextPage) {
      isLoadingOlderMessagesRef.current = true

      previousScrollHeightRef.current = container.scrollHeight

      previousScrollTopRef.current = container.scrollTop

      try {
        await fetchNextPage()
      } catch {
        isLoadingOlderMessagesRef.current = false

        previousScrollHeightRef.current = null
        previousScrollTopRef.current = null
      }
    }
  }

  if (!conversation_id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start chatting.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : isError && !data ? (
        <div className="py-10">
          <Error
            text="Failed to load messages"
            buttonFunc={handleMessageFetchingError}
          />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <div className="flex items-center gap-3 border-b pb-2 -mt-2">
              {isMobile && (
                <Link to={`/${userType}/messages`} className="text-sm">
                  <ChevronLeft className="w-6 h-6" />
                </Link>
              )}

              <div className="flex items-center gap-2">
                <ProfileImage
                  size="size-10"
                  noStatus
                  avatar={receiver?.participant_two?.profile?.avatar?.avatar}
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {receiver?.participant_two?.profile?.display_name}
                  </h2>

                  <div className="text-xs md:text-sm flex items-center gap-1.5 font-medium -mt-0.5"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center max-w-xs mx-auto border mt-3 rounded-sm text-xs/3.5 py-1">
              <ProposePriceDialog />
              <NegotiatePriceDialog />
              <AgreementDialog />
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {/* Loading older messages */}
            {isFetchingNextPage && (
              <div className="text-sm md:text-base text-center">
                Loading older messages...
              </div>
            )}

            {/* Error loading older messages */}
            {isFetchNextPageError && (
              <Error
                text="Failed to load older messages"
                buttonFunc={fetchNextPage}
                buttonText="Retry"
              />
            )}

            {/* MESSAGE LIST */}
            {sortedMessages.map((message, index) => {
              const currentDate = getDateKey(message.created_at)

              const previousMessage = sortedMessages[index - 1]

              const previousDate = previousMessage
                ? getDateKey(previousMessage.created_at)
                : null

              const isNewDate = currentDate !== previousDate

              return (
                <div key={message.message_id}>
                  {/* DATE SEPARATOR */}
                  {isNewDate && (
                    <div className="flex justify-center my-4">
                      <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        {getDateLabel(message.created_at)}
                      </span>
                    </div>
                  )}

                  {/* MESSAGE */}
                  <MessageBubble message={message} />
                </div>
              )
            })}

            {/* Bottom scroll target */}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <MessageInput
            conversationId={conversation_id}
            sendSocketMessage={sendSocketMessage}
          />
        </>
      )}
    </div>
  )
}
