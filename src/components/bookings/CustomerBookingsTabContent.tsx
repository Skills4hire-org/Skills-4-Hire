import { bookingsTabsList } from '@/assets/data'
import { customerBookings } from '@/utils/database'
import { TabsContent } from '../ui/tabs'
import CustomerBookingCard from './CustomerBookingCard'
import NoBookingCard from './NoBookingCard'

export default function CustomerBookingsTabContent() {
  const groupBookingsByStatus = (status: string) => {
    return customerBookings?.filter(
      (booking) => booking?.status?.toLowerCase() === status.toLowerCase()
    )
  }

  return (
    <>
      {bookingsTabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-6 md:space-y-8 md:py-2">
            {groupBookingsByStatus(status)?.map((booking, index) => (
              <CustomerBookingCard key={index} {...booking} />
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
