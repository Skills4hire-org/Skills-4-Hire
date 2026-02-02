import { Bell } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'
import SearchBar from '../global/SearchBar'
import Logo from '../global/Logo2'
import { Link } from 'react-router-dom'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function MobileHomeHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  return (
    <header className="md:hidden w-full pb-2">
      <div className="flex items-center justify-between pt-3 pb-4">
        <Logo size="h-[30px] w-auto" />
        <div className="flex items-center justify-center">
          {userType === 'customer' ? (
            <SidebarTrigger className="mr-1.5">
              <div className="scale-85">
                <ProfileImage />
              </div>
            </SidebarTrigger>
          ) : (
            <Link to="/service-provider/profile">
              <div className="scale-85">
                <ProfileImage />
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:gap-16">
        <div className="flex-1">
          <SearchBar
            placeholder="Search for plumbers, electricians..."
            maxWidth="w-full"
          />
        </div>

        <Link to="/customer/notification">
          <RecentNotification icon={Bell} newAlert />
        </Link>
      </div>
    </header>
  )
}
