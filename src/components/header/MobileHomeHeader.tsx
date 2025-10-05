import { Bell, Search } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'

export default function MobileHomeHeader() {
  return (
    <header className="py-2 flex items-center justify-between md:hidden pl-0.5 my-4">
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
