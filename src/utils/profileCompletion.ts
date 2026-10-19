import type { Profile } from '@/types/user.types'

export function getMissingProfileFields(
  profile: Profile | undefined,
): string[] {
  if (!profile) return []
  const missing: string[] = []
  if (!profile.user?.profile?.avatar?.avatar) missing.push('profile photo')
  if (!profile.user?.profile?.cover_photo?.image_url)
    missing.push('cover photo')
  if (!profile.overview) missing.push('bio')
  if (!profile.professional_title) missing.push('profession')
  if (!profile.headline) missing.push('headline')
  if (!profile.user?.profile?.country) missing.push('country')
  if (!profile.user?.profile?.state) missing.push('state')
  if (!profile.user?.profile?.city) missing.push('city')
  if (!profile.user?.profile?.location) missing.push('address')
  return missing
}
