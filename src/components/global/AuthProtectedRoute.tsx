import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'
import { toast } from 'sonner'

const AuthProtectedRoute = ({ children }: { children: any }) => {
  const { userType }: { userType: UserType | null } = useSelector(
    (state: any) => state.userState,
  )

  if (!userType) {
    toast.warning('Please sign in to continue')
    return <Navigate to="/sign-in" />
  }
  return children
}
export default AuthProtectedRoute
