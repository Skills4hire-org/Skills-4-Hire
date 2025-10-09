import { Bell } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'
import SearchbarDropmenu from '../global/SearchbarDropmenu'
import { Link } from 'react-router-dom'

export default function MobileHomeHeader() {
  return (
    <header className="py-3.5 flex items-center justify-between md:hidden ">
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
      <div className="flex items-center gap-2">
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
