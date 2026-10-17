import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useMyProfile } from '@/hooks/useUsers'
import { getMissingProfileFields } from '@/utils/profileCompletion'
import type { AppNotification } from '@/hooks/useNotifications'

export const PROFILE_NOTIFICATION_ID = 'complete-profile'

export const useProfileCompletionNotification = (): AppNotification | null => {
  const userType = useSelector((state: RootState) => state.userState.userType)
  const { data } = useMyProfile()

  return useMemo(() => {
    if (userType !== 'professional') return null

    const missing = getMissingProfileFields(data)
    if (missing.length === 0) return null

    return {
      notification_id: PROFILE_NOTIFICATION_ID,
      event: 'Complete your profile',
      content: `Add your ${missing.join(', ')} to get fully set up on Skills4hire.`,
      created_at: new Date().toISOString(),
      is_read: false,
    }
  }, [userType, data])
}
