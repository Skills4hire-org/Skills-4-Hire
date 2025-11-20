import type { UserType } from '@/utils/types'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function MobileBookingsHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  return (
    <header className="flex md:hidden justify-between gap-6">
      <h1 className="font-bold text-lg text-foreground py-3.5 ">Bookings</h1>
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
    </header>
  )
}
