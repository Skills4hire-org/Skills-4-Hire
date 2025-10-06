import { bookingsTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileBookingsHeader from '@/components/header/MobileBookingsHeader'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'
import BookingsTabContent from '@/components/bookings/BookingsTabContent'

export default function CustomerBookings() {
  return (
    <Container className="pt-4 pb-8">
      <MobileBookingsHeader />
      <Tabs defaultValue="ongoing" className="w-full mt-6">
        <TabHead tabList={bookingsTabsList} />
        <BookingsTabContent />
      </Tabs>
    </Container>
  )
}
