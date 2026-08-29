import { TabsContent } from '../ui/tabs'
import CustomerBookingCard from './CustomerBookingCard'
import NoBookingCard from './NoBookingCard'
import { Link } from 'react-router-dom'
import type { Booking } from '@/types/bookings.type'
import { customerBookingsTabsList } from '@/assets/data'
import BookingRequestCard from './BookingRequestCard'

export default function CustomerBookingsTabContent({
  bookings,
}: {
  bookings: Booking[] | undefined
}) {
  return (
    <>
      {customerBookingsTabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-6 md:space-y-8 md:py-2">
            {label == 'Pending'
              ? bookings?.map((booking) => (
                  <BookingRequestCard key={booking.booking_id} {...booking} />
                ))
              : bookings?.map((booking) => (
                  <CustomerBookingCard key={booking.booking_id} {...booking} />
                ))}

            {bookings?.length == 0 && (
              <>
                <NoBookingCard label={label} />
                <Link
                  to="/customer/services/professionals"
                  className="uppercase bg-primary text-white px-6 py-1.5 w-max mx-auto block -mt-21 rounded-md font-medium hover:bg-primary/90"
                >
                  Book now
                </Link>
              </>
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
