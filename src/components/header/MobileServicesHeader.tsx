import { user } from '@/utils/database'
import ProfileImage from '../global/ProfileImage'
import { Bell, Headphones } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import { SidebarTrigger } from '../ui/sidebar'

export default function MobileServicesHeader() {
  return (
    <header className="flex items-center md:hidden justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger size="lg">
          <ProfileImage />
        </SidebarTrigger>
        <div>
          <h1 className="font-semibold">
            Hi, {user?.firstName}{' '}
            <span className="text-primary">{user?.lastName}</span>
          </h1>
          <p className="text-xs">{user?.address}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Headphones className="w-5 h-5" />
        <RecentNotification icon={Bell} />
      </div>
    </header>
  )
}
