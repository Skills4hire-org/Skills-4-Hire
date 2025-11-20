import { Bell } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'
import SearchbarDropmenu from '../global/SearchbarDropmenu'
import { Link } from 'react-router-dom'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function MobileHomeHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  return (
    <header className=" flex items-center justify-between md:hidden ">
      {userType == 'customer' ? (
        <div className="py-3.5">
          <SidebarTrigger size="lg">
            <ProfileImage />
          </SidebarTrigger>
        </div>
      ) : (
        <Link className="block py-1" to="/service-provider/profile">
          <ProfileImage />
        </Link>
      )}
      <div className="flex py-3.5 items-center gap-2">
        <SearchbarDropmenu
          placeholder="Search for jobs, services or providers"
          position="-translate-x-4"
        />
        <Link to="/customer/notification">
          <RecentNotification icon={Bell} newAlert />
        </Link>
      </div>
    </header>
  )
}
