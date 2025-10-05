import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'

export default function MobileBookingsHeader() {
  return (
    <header className="flex md:hidden justify-end py-2">
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
    </header>
  )
}
