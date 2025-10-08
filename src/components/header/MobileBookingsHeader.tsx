import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'

export default function MobileBookingsHeader() {
  return (
    <header className="flex md:hidden justify-between gap-6 py-3.5">
      <h1 className="font-bold text-lg">Bookings</h1>
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
    </header>
  )
}
