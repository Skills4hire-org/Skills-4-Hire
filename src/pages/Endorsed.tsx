import EndorsedCard from '@/components/endorse/EndorsedCard'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useMyEndorsed } from '@/hooks/useEndorse'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Endorser } from '@/types/endorse.types'

export default function Endorsed() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useMyEndorsed()
  const endorsers: Endorser[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleEndorsedFetchingError = () => {
    refetch()
  }

  return (
    <div className="min-h-screen ">
      <div className="capitalize">
        <HeaderWithBackNavigation title="Endorsed" />
      </div>
      <Container>
        <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-9 md:ml-0">
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {isError && !data ? (
                <div className="py-10">
                  <Error
                    text="Failed to load endosers"
                    buttonFunc={handleEndorsedFetchingError}
                  />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-1 md:gap-4">
                    {endorsers?.map((endorser) => (
                      <EndorsedCard
                        key={endorser.endorsement_id}
                        {...endorser}
                      />
                    ))}
                  </div>
                  {endorsers?.length === 0 && (
                    <p className="text-base md:text-lg font-medium text-center h-24 flex items-center justify-center">
                      No endorsed yet.
                    </p>
                  )}

                  <div ref={loadMoreRef} />

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
                      Load more
                    </button>
                  )}
                  {isFetchNextPageError && (
                    <Error
                      text="Failed to load more endorsed professionals"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
