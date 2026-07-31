import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import Container from '@/components/global/Container'
import RequestCard from '@/components/overview/RequestCard'
import { useHireRequests } from '@/hooks/usePosts'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import NoJobsFound from '@/components/global/NoResultFound'
import { Briefcase } from 'lucide-react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Request() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHireRequests()

  const requests = data?.pages.flatMap((page) => page?.results ?? []).filter(Boolean) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <div>
      <HeaderWithBackNavigation title="Hire Requests" onlyMobile={false} />
      <Container>
        <div className="w-full flex flex-col gap-2 md:gap-4 max-w-xl mx-auto">
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : isError && !data ? (
            <div className="py-10">
              <Error text="Failed to load hire requests" buttonFunc={refetch} />
            </div>
          ) : requests.length === 0 ? (
            <div className="py-10">
              <NoJobsFound icon={Briefcase} text="No hire requests yet" />
            </div>
          ) : (
            <>
              {requests.map((post) => (
                <RequestCard key={post.post_id} post={post} />
              ))}
              <div ref={loadMoreRef} />
              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
