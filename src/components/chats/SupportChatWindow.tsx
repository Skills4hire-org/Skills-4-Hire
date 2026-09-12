import { useCallback, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useIsChatMobile } from '@/hooks/use-mobile'
import { ChevronLeft } from 'lucide-react'
import type { UserType } from '@/utils/types'
import {
  updateSupportMessage,
  updateSupportConversationList,
  useChatSupportSocket,
  useSupportMessages,
} from '@/hooks/useChats'
import type { SupportMessage } from '@/types/chat.types'
import Loading from '../global/Loading'
import Error from '../global/Error'
import SupportMessageBubble from './SupportMessageBubble'
import SupportMessageInput from './SupportMessageInput'

export default function SupportChatWindow() {
  const { conversationId: conversation_id } = useParams()

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
  } = useSupportMessages({
    conversation_id,
  })

  const messages: SupportMessage[] =
    data?.pages.flatMap((page) => page.results) ?? []


  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  const ticket_no = messages[0]?.support?.support_id
  const ticket_status = messages[0]?.support?.status

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

  /*   const [isReceiverOnline, setIsReceiverOnline] = useState(false) */

  const handleSocketMessage = useCallback(
    (data: any) => {
      /* if (data.event === 'online') {
        setIsReceiverOnline(data.data.is_online)

        return
      } */
      if (data.event === 'message' && data.data) {
        const incomingMessage: SupportMessage = data.data

        updateSupportMessage(incomingMessage, conversation_id!)

        updateSupportConversationList(incomingMessage, conversation_id!)
      }
    },
    [conversation_id],
  )

  const { sendSocketMessage } = useChatSupportSocket(
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
        Select a ticket to start messaging.
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
                <Link to={`/${userType}/customer-support`} className="text-sm">
                  <ChevronLeft className="w-6 h-6" />
                </Link>
              )}

              <div className="space-y-1">
                <h2 className="font-semibold text-lg">
                  Ticket No: <span className="pl-1 break-all">{ticket_no}</span>
                </h2>
                <div className="flex items-center gap-6">
                  <p className="text-base text-gray-500">
                    Ticket Status:{' '}
                    <span
                      className={`pl-1 capitalize  ${ticket_status == 'open' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {ticket_status}
                    </span>
                  </p>
                  {/*  <div
                    className={`${
                      isReceiverOnline ? 'text-green-500' : 'text-gray-400'
                    } flex items-center gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isReceiverOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                    <span>{isReceiverOnline ? 'Online' : 'Offline'}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 space-y-3"
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
                  <SupportMessageBubble message={message} />
                </div>
              )
            })}

            {/* Bottom scroll target */}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <SupportMessageInput
            conversationId={conversation_id}
            sendSocketMessage={sendSocketMessage}
          />
        </>
      )}
    </div>
  )
}
