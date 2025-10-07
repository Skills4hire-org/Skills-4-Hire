import { Bell, Search } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'

export default function MobileHomeHeader() {
  return (
    <header className="py-3.5 flex items-center justify-between md:hidden ">
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" />

        <RecentNotification icon={Bell} newAlert />
      </div>
    </header>
  )
}
