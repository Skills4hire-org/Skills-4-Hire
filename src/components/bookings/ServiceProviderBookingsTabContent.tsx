import { providerBookingsTabsList } from '@/assets/data'
import { TabsContent } from '../ui/tabs'
import NoBookingCard from './NoBookingCard'
import ServiceProviderBookingCard from './ServiceProviderBookingCard'
import BookingRequestCard from './BookingRequestCard'
import type { Booking } from '@/types/bookings.type'

export default function ServiceProviderBookingsTabContent({
  bookings,
  handleRefetch,
}: {
  bookings: Booking[] | undefined
  handleRefetch: () => void
}) {
  return (
    <>
      {providerBookingsTabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-6 md:space-y-8 md:py-2">
            {bookings?.map((booking) =>
              status === 'Funded' ? (
                <BookingRequestCard
                  key={booking.booking_id}
                  {...booking}
                  handleRefetch={handleRefetch}
                />
              ) : (
                <ServiceProviderBookingCard
                  key={booking.booking_id}
                  {...booking}
                />
              ),
            )}

            {bookings?.length == 0 && <NoBookingCard label={label} />}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
