import { Bell, Search } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'
import Container from '../global/Container'

export default function CustomerMobileHeader() {
  return (
    <Container>
      <header className="py-4 flex items-center justify-between md:hidden">
        <SidebarTrigger>
          <ProfileImage size="base" />
        </SidebarTrigger>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />

          <RecentNotification icon={Bell} size="base" />
        </div>
      </header>
    </Container>
  )
}
