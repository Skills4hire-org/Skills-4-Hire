import CustomerProfileForm from '@/components/form/CustomerProfileForm'
import ServiceProviderProfile from '@/components/profile/ServiceProviderProfile'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const UserForm =
    userType == 'customer' ? CustomerProfileForm : ServiceProviderProfile
  return (
    <div className='lg:ml-17 max-[1023px]:min-[768px]:ml-17 flex flex-col gap-15'>
      <HeaderWithBackNavigation title="Profile" />
      <div>
        <UserForm />
      </div>
    </div>
  )
}
