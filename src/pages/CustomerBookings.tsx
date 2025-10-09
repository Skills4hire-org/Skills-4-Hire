import { bookingsTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileBookingsHeader from '@/components/header/MobileBookingsHeader'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'
import BookingsTabContent from '@/components/bookings/BookingsTabContent'
import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'

export default function CustomerBookings() {
  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white">
        <MobileBookingsHeader />
        <TitleOnlyDesktopHeader title="Bookings" />
      </Container>
      <Container>
        <Tabs defaultValue="ongoing" className="w-full">
          <TabHead tabList={bookingsTabsList} />
          <BookingsTabContent />
        </Tabs>
      </Container>
    </div>
  )
}
