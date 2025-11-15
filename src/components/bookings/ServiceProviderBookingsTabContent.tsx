import { bookingsTabsList } from '@/assets/data'
import { serviceProviderBookings } from '@/utils/database'
import { TabsContent } from '../ui/tabs'
import NoBookingCard from './NoBookingCard'
import ServiceProviderBookingCard from './ServiceProviderBookingCard'

export default function ServiceProviderBookingsTabContent() {
  const groupBookingsByStatus = (status: string) => {
    return serviceProviderBookings?.filter(
      (booking) => booking?.status?.toLowerCase() === status.toLowerCase()
    )
  }

  return (
    <>
      {bookingsTabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-6 md:space-y-8 md:py-2">
            {groupBookingsByStatus(status)?.map((booking, index) => (
              <ServiceProviderBookingCard key={index} {...booking} />
            ))}

            {groupBookingsByStatus(status)?.length == 0 && (
              <NoBookingCard label={label} />
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
