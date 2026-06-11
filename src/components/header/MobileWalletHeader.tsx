import { useSelector } from 'react-redux'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import type { UserType } from '@/utils/types'
import { Link } from 'react-router-dom'
import type { UserData } from '@/types/user.types'

export default function MobileWalletHeader({ title }: { title?: string }) {
  const { userType, user_data }: { userType: UserType; user_data: UserData } =
    useSelector((state: any) => state.userState)
  const is_active = navigator.onLine
  return (
    <header className="flex items-center md:hidden justify-between gap-6 py-3">
      <h1 className="font-bold text-lg">{title || 'Wallet'}</h1>
      {userType == 'customer' ? (
        <SidebarTrigger className="mr-1.5">
          <ProfileImage
            size="size-10"
            is_active={is_active}
            avatar={user_data?.profile.avatar.avatar}
          />
        </SidebarTrigger>
      ) : (
        <Link className="block -my-2" to="/professional/profile">
          <ProfileImage
            size="size-10"
            is_active={is_active}
            avatar={user_data?.profile.avatar.avatar}
          />
        </Link>
      )}
    </header>
  )
}
