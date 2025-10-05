import { bookingsTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileBookingsHeader from '@/components/header/MobileBookingsHeader'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'
import BookingsTabContent from '@/components/bookings/BookingsTabContent'

export default function CustomerBookings() {
  return (
    <div className="pt-4 pb-8 space-y-6">
      <Container>
        <MobileBookingsHeader />
      </Container>
      <Tabs
        defaultValue="ongoing"
        className="w-full max-w-6xl xl:max-w-7xl mx-auto"
      >
        <TabHead tabList={bookingsTabsList} />
        <Container>
          <BookingsTabContent />
        </Container>
      </Tabs>
    </div>
  )
}
