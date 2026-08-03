import { useSelector } from 'react-redux'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import type { UserType } from '@/utils/types'
import { Link } from 'react-router-dom'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function MobileWalletHeader({ title }: { title?: string }) {
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const is_active = navigator.onLine
  return (
    <header className="flex items-center md:hidden justify-between gap-6 py-3">
      <h1 className="font-bold text-lg">{title || 'Wallet'}</h1>
      {userType == 'customer' ? (
        <SidebarTrigger className="mr-1.5">
          <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
        </SidebarTrigger>
      ) : (
        <Link className="block -my-2" to="/professional/profile">
          <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
        </Link>
      )}
    </header>
  )
}
