import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
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
      const data = referral_code
        ? { token: googleToken, referral_code: referral_code }
        : {
            token: googleToken,
          }

      const response = await googleSignIn(data)

      console.log(response)

      dispatch(setUserCredentials(response))

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
