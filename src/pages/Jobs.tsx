import { Briefcase } from 'lucide-react'
import { useState } from 'react'
import NoJobsFound from '@/components/global/NoResultFound'
import { useBookings } from '@/hooks/useBookings'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Booking } from '@/types/bookings.type'
import JobCard from '@/components/home/JobCard'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'

const jobsTabsList = [
  {
    status: 'Pending',
    label: 'Pending',
  },
  {
    status: 'In_progress',
    label: 'Ongoing',
  },
  {
    status: 'Completed',
    label: 'Completed',
  },
]

export default function Jobs() {
  const [bookingStatus, setBookingStatus] = useState('Pending')
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useBookings({ booking_status: bookingStatus })

  const bookings: Booking[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleJobsFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  return (
    <div className="lg:px-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-sm md:text-base text-gray-900">
            My Jobs
          </h2>
        </div>

        <Tabs defaultValue="Pending" className="w-full">
          <TabHead tabList={jobsTabsList} setStatus={setBookingStatus} />

          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {isError && !data ? (
                <div className="py-10">
                  <Error
                    text="Failed to load jobs"
                    buttonFunc={handleJobsFetchingError}
                  />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {bookings.length === 0 ? (
                      <NoJobsFound
                        icon={Briefcase}
                        text="No jobs found"
                        subtitle="Jobs assigned to you will show up here"
                      />
                    ) : (
                      bookings.map((booking) => (
                        <JobCard key={booking.booking_id} {...booking} />
                      ))
                    )}
                  </div>

                  <div ref={loadMoreRef} />

                  {isFetchingNextPage && (
                    <div className="py-4 text-center">
                      <Loading />
                    </div>
                  )}
                  {hasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                      onClick={() => fetchNextPage()}
                    >
                      Load more
                    </button>
                  )}
                  {isFetchNextPageError && (
                    <Error
                      text="Failed to load more jobs"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </Tabs>
      </div>
    </div>
  )
}
