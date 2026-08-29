import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { providerOverviewData } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileServicesOverviewHeader from '@/components/header/MobileServicesOverviewHeader'
import DesktopServicesOverviewHeader from '@/components/header/DesktopServicesOverviewHeader'
import { Link } from 'react-router-dom'
import NoReviewCard from '@/components/reviews/NoReviewCard'
import ReferAndEarnBanner from '@/components/services/ReferAndEarnBanner'
import { useBookings } from '@/hooks/useBookings'
import type { UserData } from '@/types/user.types'
import { useSelector } from 'react-redux'
import { currencyFormatter, formatSpaceToString } from '@/utils/format'
import BookingRequestCard from '@/components/bookings/BookingRequestCard'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import type { Booking } from '@/types/bookings.type'
import { useMyProfileOverview } from '@/hooks/useUsers'
import { useReviews } from '@/hooks/useReviews'
import ReviewCard from '@/components/reviews/ReviewCard'
import { BookOpen } from 'lucide-react'
import { User } from 'lucide-react'
import { Wallet } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProviderOverview() {
  const { chart } = providerOverviewData

  const { user_data }: { user_data: UserData } = useSelector(
    (state: any) => state.userState,
  )

  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
    refetch: reviewRefetch,
  } = useReviews()

  const reviews = reviewData?.pages.flatMap((page) => page.result) ?? []

  const {
    data: statData,
    isLoading: statLoading,
    isError: statError,
  } = useMyProfileOverview()

  const stats = [
    { label: 'Total Booking', value: statData?.total_bookings, icon: BookOpen },
    { label: 'Total Service', value: statData?.completed_bookings, icon: User },
    {
      label: 'Total Earning',
      value: statData?.booking_earnings?.total_amount,
      icon: Wallet,
    },
    { label: 'Wallet', value: statData?.wallet?.balance, icon: Wallet },
  ]

  console.log(statData)

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: bookingsRefetch,
  } = useBookings({ booking_status: 'Funded' })
  const latestBookings: Booking[] =
    bookingsData?.pages.flatMap((page) => page.results) ?? []

  const handleBookingRequestFetchingError = () => {
    bookingsRefetch()
  }

  const handleReviewsFetchingError = () => {
    reviewRefetch()
  }

  return (
    <div className="space-y-2 md:space-y-6  max-[1023px]:min-[768px]:ml-17 lg:ml-[4.2rem]">
      <Container className="bg-white">
        <MobileServicesOverviewHeader />
        <DesktopServicesOverviewHeader />
      </Container>
      <Container>
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-md p-3 text-sm md:text-base text-gray-700 w-full space-y-1 md:max-w-xs ">
            <p>
              Professional Skill:{' '}
              <span className="font-semibold capitalize">
                {formatSpaceToString(user_data?.profile?.professional_title)}
              </span>
            </p>
            <p>
              App Commission: {''}
              <span className="font-semibold">8%</span>
            </p>
          </div>
          <section className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4">
            <h2 className="sr-only">Stat</h2>
            {stats.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-primary rounded-md py-3 md:py-4 px-1.5 md:px-2 shadow space-y-4 text-white w-full"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl md:text-2xl font-semibold leading-tight">
                      {statLoading ? (
                        <Skeleton className="w-10 h-3 md:h-4 rounded-sm" />
                      ) : statError ? (
                        '---'
                      ) : item.label == 'Total Earning' ||
                        item.label == 'Wallet' ? (
                        currencyFormatter(item.value)
                      ) : (
                        item.value
                      )}
                    </span>

                    <span className="bg-white rounded-full p-2 flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm opacity-90">
                    {item.label}
                  </h3>
                </div>
              )
            })}
          </section>
          <section className="bg-white rounded-lg px-2 py-4 md:px-3 md:py-6 space-y-4 md:space-y-6 shadow-md ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Booking Requests ({latestBookings?.length})
              </h2>
              <Link
                to="/professional/booking-requests"
                className="text-xs md:text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div>
              {bookingsLoading ? (
                <div className="h-24">
                  <Loading />
                </div>
              ) : (
                <>
                  {bookingsError ? (
                    <div className="py-6">
                      <Error
                        text="Failed to load your booking requests"
                        buttonFunc={handleBookingRequestFetchingError}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-full">
                        {latestBookings && latestBookings.length !== 0 && (
                          <BookingRequestCard {...latestBookings[0]} />
                        )}
                      </div>

                      {latestBookings?.length === 0 && (
                        <p className="text-base md:text-lg font-medium text-center h-24 flex items-center justify-center">
                          No booking requests yet.
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
          <ReferAndEarnBanner />
          <section className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="font-semibold text-gray-900 mb-4 text-center">
              Monthly Revenue (₦)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chart}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'hsl(var(--primary))', fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(val) => val.toLocaleString()}
                  tick={{ fill: '#111', fontSize: 12 }}
                  domain={[0, 500000]}
                  ticks={[
                    0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                    400000, 450000, 500000,
                  ]}
                />
                <Tooltip
                  formatter={(val) => `₦${val?.toLocaleString() ?? 0}`}
                />
                <Bar dataKey="revenue" fill="#222BDE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Reviews ({reviews?.length})
              </h2>
              <Link
                to="/professional/reviews"
                className="text-xs md:text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div>
              {reviewLoading ? (
                <div className="h-24">
                  <Loading />
                </div>
              ) : (
                <>
                  {reviewError ? (
                    <div className="py-6">
                      <Error
                        text="Failed to load your reviews"
                        buttonFunc={handleReviewsFetchingError}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-full">
                        {reviews?.length !== 0 && (
                          <ReviewCard {...reviews[0]} />
                        )}
                      </div>

                      {reviews?.length === 0 && <NoReviewCard />}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
