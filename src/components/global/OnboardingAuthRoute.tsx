import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function OnboardingAuthRoute({ children }: { children: ReactNode }) {
  const { access, refresh } = useSelector((state: any) => state.userState)
  const hasSession = Boolean(access || refresh)

  useEffect(() => {
    if (!hasSession) toast.warning('Sign in to continue your registration.')
  }, [hasSession])

  return hasSession ? children : <Navigate to="/sign-in" replace />
}
