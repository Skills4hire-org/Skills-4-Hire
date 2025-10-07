import { user } from '@/utils/database'
import ProfileImage from '../global/ProfileImage'
import { Bell, Headphones } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import { SidebarTrigger } from '../ui/sidebar'
import Container from '../global/Container'

export default function MobileServicesHeader() {
  return (
    <Container className="py-2 bg-white md:hidden">
      <header className="flex items-center justify-between gap-2  ">
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
    </Container>
  )
}
