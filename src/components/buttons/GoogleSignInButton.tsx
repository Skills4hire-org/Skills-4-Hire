import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { jwtDecode } from 'jwt-decode'
import { googleSignIn } from '@/api/auth'
import { setUserCredentials } from '@/features/user/userSlice'

function GoogleSignInButton({
  referral_code,
}: {
  referral_code?: string | null
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const googleToken = credentialResponse?.credential

      if (!googleToken) {
        toast.error('Google authentication failed')
        return
      }

      let credentialEmail: string | undefined
      try {
        credentialEmail = jwtDecode<{ email?: string }>(googleToken)?.email
      } catch {
        credentialEmail = undefined
      }

      const data = referral_code
        ? { token: googleToken, referral_code: referral_code }
        : {
            token: googleToken,
          }

      const response = await googleSignIn(data)

      const access = response?.access ?? response?.access_token
      const refresh = response?.refresh ?? response?.refresh_token

      // No tokens returned means the account exists but still needs email OTP
      // verification. Do not create a broken session — send the user to the
      // verification screen (same flow as email sign-up) so they can enter or
      // resend the OTP instead of being stuck looping back to sign-in.
      if (!access || !refresh) {
        const email = response?.user_data?.email ?? credentialEmail
        if (email) {
          localStorage.setItem('pendingVerificationEmail', email)
        }
        toast.info(
          response?.message ||
            'Your account needs verification. Please enter the OTP sent to your email.',
        )
        navigate('/verification', { state: email ? { email } : undefined })
        return
      }

      dispatch(
        setUserCredentials({
          access,
          refresh,
          user_data: response?.user_data,
        }),
      )

      if (
        !response?.user_data?.is_customer &&
        !response?.user_data?.is_provider
      ) {
        navigate('/onboarding')
      } else {
        const userType = response?.user_data?.is_customer
          ? 'customer'
          : 'professional'

        navigate(`/${userType}/home`)
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      toast.error(error?.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="w-max mx-auto">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          toast.error('Google Sign In failed')
        }}
      />
    </div>
  )
}

export default GoogleSignInButton
