import { useSelector } from 'react-redux'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import type { UserType } from '@/utils/types'
import { Link } from 'react-router-dom'

export default function MobileWalletHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  return (
    <header className="flex items-center md:hidden justify-between gap-6 py-3">
      <h1 className="font-bold text-lg">Wallet</h1>
      {userType == 'customer' ? (
        <SidebarTrigger className="mr-1.5">
          <ProfileImage size="size-10" />
        </SidebarTrigger>
      ) : (
        <Link className="block -my-2" to="/service-provider/profile">
          <ProfileImage size="size-10" />
        </Link>
      )}
    </header>
  )
}
