import BookingRequestCard from '@/components/bookings/BookingRequestCard'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import { useBookings } from '@/hooks/useBookings'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Booking } from '@/types/bookings.type'

export default function BookingRequest() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useBookings({ booking_status: 'Funded' })
  const bookingRequests: Booking[] =
    data?.pages.flatMap((page) => page?.results ?? []) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleBookingRequestFetchingError = () => {
    refetch()
  }

  return (
    <div className="space-y-2 md:space-y-4 lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Booking Requests" />
      </Container>
      <Container>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-6">
                <Error
                  text="Failed to load your booking requests"
                  buttonFunc={handleBookingRequestFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2 md:space-y-4">
                  {bookingRequests?.map((request) => (
                    <BookingRequestCard key={request.booking_id} {...request} />
                  ))}
                </div>

                {bookingRequests?.length === 0 && (
                  <p className="text-base md:text-lg font-medium text-center h-24 flex items-center justify-center">
                    No booking requests yet.
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
                    text="Failed to load more  booking requests"
                    buttonFunc={fetchNextPage}
                    buttonText="Retry"
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
