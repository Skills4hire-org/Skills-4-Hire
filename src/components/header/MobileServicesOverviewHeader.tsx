import { user } from '@/utils/database'
import ProfileImage from '../global/ProfileImage'
import { Bell, Headphones } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import { SidebarTrigger } from '../ui/sidebar'
import { Link } from 'react-router-dom'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function MobileServicesOverviewHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  return (
    <header className="flex items-center md:hidden justify-between gap-2 py-1">
      <div className="flex items-center gap-2">
        {userType == 'customer' ? (
          <SidebarTrigger className="ml-1.5">
            <ProfileImage size="size-10" />
          </SidebarTrigger>
        ) : (
          <Link className="block -my-2" to="/service-provider/profile">
            <ProfileImage size="size-10" />
          </Link>
        )}
        <div>
          <h1 className="font-semibold">
            Hi, {user?.firstName}{' '}
            <span className="text-primary">{user?.lastName}</span>
          </h1>
          <p className="text-xs">{user?.address}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/customer/support">
          <Headphones className="w-5 h-5" />
        </Link>
        <Link to="/customer/notification">
          <RecentNotification icon={Bell} />
        </Link>
      </div>
    </header>
  )
}
