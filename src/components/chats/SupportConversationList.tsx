import type { SupportConversation } from '@/types/chat.types'
import NoChat from './NoChat'
import { useCreateTicket, useSupportConversations } from '@/hooks/useChats'
import Loading from '../global/Loading'
import Error from '../global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import SupportConversationCard from './SupportConversationCard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { UserType } from '@/types/user.types'
import { useSelector } from 'react-redux'

export default function SupportConversationList() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
  } = useSupportConversations()
  const conversations: SupportConversation[] =
    data?.pages.flatMap((page) => page?.results ?? []) ?? []

  const sortedConversations = [...conversations].sort(
    (a, b) =>
      new Date(b.support.updated_at).getTime() -
      new Date(a.support.updated_at).getTime(),
  )

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleConversationFetchingError = () => {
    refetch()
  }
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { mutate: openTicket, isPending } = useCreateTicket()

  const navigate = useNavigate()
  const handleOpenTicket = () => {
    openTicket(undefined, {
      onSuccess: (ticket) => {
        const conversationId = ticket?.conversation_id
        if (!conversationId) return toast.error('Unable to open a ticket.')
        const basePath = userType == 'customer' ? '/customer' : '/professional'
        navigate(`${basePath}/customer-support/${conversationId}`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : isError && !data ? (
        <div className="py-10">
          <Error
            text="Failed to load tickets."
            buttonFunc={handleConversationFetchingError}
          />
        </div>
      ) : (
        <>
          {conversations.length === 0 ? (
            <>
              <NoChat text="No opened ticket yet" />
              <button
                onClick={handleOpenTicket}
                disabled={isPending}
                className="py-2 px-6 bg-primary text-sm md:text-base my-6 mx-auto text-white font-medium rounded-sm block w-max cursor-pointer"
              >
                Open a new ticket
              </button>
            </>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 gap-2">
                {sortedConversations.map((conversation) => (
                  <SupportConversationCard
                    key={conversation.conversation_id}
                    conversation={conversation}
                  />
                ))}
              </div>
              <div ref={loadMoreRef} />

              <button
                onClick={handleOpenTicket}
                disabled={isPending}
                className="py-2 px-6 bg-primary text-sm md:text-base my-6 mx-auto text-white font-medium rounded-sm block w-max cursor-pointer"
              >
                Open a new ticket
              </button>

              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
              {hasNextPage && (
                <button
                  className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md block w-max mx-auto"
                  onClick={() => fetchNextPage()}
                >
                  Load more tickets
                </button>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more conversations"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
