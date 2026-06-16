import { login } from '@/api/auth'
import { setUserCredentials } from '@/features/user/userSlice'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { loginSchema } from '@/utils/schemas'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../form-fields/FormInput'
import { toast } from 'sonner'

interface SignInFormProps {
  initialEmail?: string
}

export default function SignInForm({ initialEmail }: SignInFormProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: initialEmail || '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validatedData = useValidateSchema(loginSchema, formData)
    if (!validatedData) return

    setLoading(true)

    try {
       const response = await login(validatedData)
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
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-3 text-left">
      <FormInput
        name="email"
        type="email"
        placeholder="Email address"
        value={formData.email}
        handleInputChange={handleChange}
        required
      />

      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        handleInputChange={handleChange}
        required
      />
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
