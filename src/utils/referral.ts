import type { Referral, ReferralDetails } from '@/types/referrals.types'

export const REFERRAL_BONUS = 1000
export const REQUIRED_HIRES = 3
export const MIN_BOOKING_VALUE = 5000

export const getReferralBalances = (details?: ReferralDetails) => {
  const total =
    details?.total_earnings ??
    (details?.total_referrals ?? 0) * REFERRAL_BONUS
  const withdrawable = details?.withdrawable_balance ?? details?.balance ?? 0
  const pending = Math.max(total - withdrawable, 0)
  return { total, withdrawable, pending }
}

export const getReferralProgress = (
  referral: Pick<
    Referral,
    'valid_hires' | 'required_hires' | 'status'
  >,
) => {
  const required = referral.required_hires ?? REQUIRED_HIRES
  const unlocked =
    referral.status === 'completed' || referral.status === 'unlocked'
  const valid = referral.valid_hires
    ? Math.max(0, referral.valid_hires)
    : unlocked
      ? required
      : 0
  const percent = required > 0 ? Math.min((valid / required) * 100, 100) : 0
  return { valid, required, unlocked, percent }
}