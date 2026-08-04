import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'
import { toast } from 'sonner'

const AuthProtectedRoute = ({ children }: { children: any }) => {
  const { userType }: { userType: UserType | null } = useSelector(
    (state: any) => state.userState,
  )
  const { userType: urlUserType } = useParams<{ userType: string }>()

  if (!userType) {
    toast.warning('Please sign in to continue')
    return <Navigate to="/sign-in" />
  }

  // Prevent a customer from accessing /professional/* routes and vice versa
  if (urlUserType && urlUserType !== userType) {
    return <Navigate to={`/${userType}/home`} replace />
  }

  return children
}
export default AuthProtectedRoute
