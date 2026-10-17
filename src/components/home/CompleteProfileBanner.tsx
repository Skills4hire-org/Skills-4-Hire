import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AlertCircle, ArrowRight, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useMyProfile } from '@/hooks/useUsers'
import { getMissingProfileFields } from '@/utils/profileCompletion'

const DISMISSED_KEY = 'complete-profile-banner-dismissed'

export default function CompleteProfileBanner() {
  const userType = useSelector((state: RootState) => state.userState.userType)
  const { data, isLoading, isError } = useMyProfile()

  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(DISMISSED_KEY) === '1',
  )

  if (userType !== 'professional' || dismissed) return null
  if (isLoading || isError) return null

  const missing = getMissingProfileFields(data)
  if (missing.length === 0) return null

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setDismissed(true)
  }

  return (
    <div className="flex items-start sm:items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 md:px-5 py-3 md:py-4">
      <div className="flex items-start sm:items-center gap-3">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <p className="text-sm md:text-base font-semibold text-gray-900">
            Your profile is incomplete
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            Add your {missing.join(', ')} to get fully set up on Skills4hire.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          to={`/${userType}/profile`}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 md:px-4 text-xs md:text-sm font-medium text-white hover:opacity-90"
        >
          Complete profile
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}