import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Landing from '@/pages/Landing'
import type { AuthUser } from '@/types/user.types'
import type { RootState } from '@/store'

export default function IndexRedirect() {
  const { user_data } = useSelector(
    (state: RootState) => state.userState,
  ) as AuthUser

  if (user_data) {
    const isCustomer = user_data.is_customer
    const isProvider = user_data.is_provider

    if (!isCustomer && !isProvider) {
      return <Navigate to="/onboarding" replace />
    }

    return <Navigate to={`/${isCustomer ? 'customer' : 'professional'}/home`} replace />
  }

  return <Landing />
}