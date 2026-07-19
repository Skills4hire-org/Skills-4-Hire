import { Link, useNavigate } from 'react-router-dom'
import AuthLogo from '@/components/global/AuthLogo'
import SignUpForm from '@/components/form/SignUpForm'

export default function SignUp() {
  const navigate = useNavigate()

  const handleSignUpSuccess = (email: string) => {
    //Persist email for verification recovery
    localStorage.setItem('pendingVerificationEmail', email)

    navigate('/verification', {
      state: { email },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-3">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Sign up</h1>

        <p className="text-sm text-gray-500 mb-6">
          Connect with skilled professional. Get hired on Skills4hire
        </p>

        <SignUpForm onSuccess={handleSignUpSuccess} />

        <p className="text-sm text-gray-600 mt-3">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="grow border-t-2 border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="grow border-t-2 border-gray-300"></div>
        </div>

        <button className="flex justify-center items-center gap-2 w-full bg-gray-200 p-2 rounded-sm">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-7 h-7"
          />
          <span className="font-medium text-gray-600 text-lg">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  )
}
