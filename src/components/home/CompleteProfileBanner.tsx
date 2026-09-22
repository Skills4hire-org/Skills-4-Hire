import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AlertCircle, ArrowRight, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { Profile } from '@/types/user.types'
import { useMyProfile } from '@/hooks/useUsers'

const DISMISSED_KEY = 'complete-profile-banner-dismissed'

function getMissingProfileFields(profile: Profile | undefined): string[] {
  if (!profile) return []
  const missing: string[] = []
  if (!profile.professional_title) missing.push('profession')
  if (!profile.headline) missing.push('headline')
  if (!profile.user?.profile?.country) missing.push('country')
  if (!profile.user?.profile?.state) missing.push('state')
  if (!profile.user?.profile?.city) missing.push('city')
  if (!profile.user?.profile?.location) missing.push('address')
  return missing
}

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