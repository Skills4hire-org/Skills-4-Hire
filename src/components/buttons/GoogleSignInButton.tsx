import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { googleSignIn } from '@/api/auth'
import { setUserCredentials } from '@/features/user/userSlice'

function GoogleSignInButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const googleToken = credentialResponse?.credential
      if (!googleToken) {
        toast.error('Google authentication failed')
        return
      }
      const response = await googleSignIn({
        token: googleToken,
      })

      dispatch(setUserCredentials(response))
      if (
        !response?.user_data?.is_customer &&
        !response?.user_data?.is_provider
      ) {
        navigate(`/onboarding`)
      } else {
        const userType = response?.user_data?.is_customer
          ? 'customer'
          : 'professional'
        navigate(`/${userType}/home`)
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const handleGoogleSignIn = () => {
    useGoogleOneTapLogin({
      onSuccess: handleSuccess,
      onError: () => toast.error('Google Sign In failed'),
    })
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center gap-2 w-full bg-gray-200 p-2 rounded-sm"
    >
      <img
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="Google"
        className="w-7 h-7"
      />
      <span className="font-medium text-gray-600 text-lg">
        Sign in with Google
      </span>
    </button>
  )
}

export default GoogleSignInButton
