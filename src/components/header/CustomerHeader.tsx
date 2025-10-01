import { Search } from 'lucide-react'
import { RiNotificationBadgeFill } from 'react-icons/ri'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'

export default function CustomerHeader() {
  return (
    <header className="py-4 flex items-center justify-between">
      <SidebarTrigger>
        <ProfileImage size="base" />
      </SidebarTrigger>
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        <div className="relative">
          <RiNotificationBadgeFill className="w-4 h-4" />
          <span className="border border-background bg-red-600 w-2 h-2 rounded-full absolute top-0 right-0" />
        </div>
      </div>
    </header>
  )
}
