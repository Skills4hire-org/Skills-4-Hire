import { bookingsTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileBookingsHeader from '@/components/header/MobileBookingsHeader'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'
import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import CustomerBookingsTabContent from '@/components/bookings/CustomerBookingsTabContent'
import ServiceProviderBookingsTabContent from '@/components/bookings/ServiceProviderBookingsTabContent'

export default function Bookings() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const BookingsTabContent =
    userType == 'customer'
      ? CustomerBookingsTabContent
      : ServiceProviderBookingsTabContent
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
