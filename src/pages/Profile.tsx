import CustomerProfileForm from '@/components/form/CustomerProfileForm'
import ServiceProviderProfileForm from '@/components/form/ServiceProviderProfileForm'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const UserForm =
    userType == 'customer' ? CustomerProfileForm : ServiceProviderProfileForm
  return (
    <div>
      <HeaderWithBackNavigation title="Profile" />
      <div>
        <UserForm />
      </div>
    </div>
  )
}
