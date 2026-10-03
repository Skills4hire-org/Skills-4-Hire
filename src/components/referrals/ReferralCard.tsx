import type { Referral } from '@/types/referrals.types'
import ProfileImage from '../global/ProfileImage'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getReferralProgress } from '@/utils/referral'

export default function ReferralCard({
  referred,
  valid_hires,
  required_hires,
  status,
}: Referral) {
  const { valid, required, unlocked, percent } = getReferralProgress({
    valid_hires,
    required_hires,
    status,
  })

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-500">
      <ProfileImage
        noStatus
        size="size-10"
        avatar={referred?.profile?.avatar?.avatar}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-sm text-gray-900 truncate">
            {referred?.profile?.display_name}
          </h3>
          <Badge
            className={
              unlocked
                ? 'bg-green-600 text-white border-transparent'
                : 'bg-amber-500 text-white border-transparent'
            }
          >
            {unlocked ? 'Completed' : 'Pending'}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {valid}/{required} valid hires completed
        </p>
        <Progress
          value={percent}
          className={`mt-1.5 h-1.5 ${
            unlocked ? '[&>div]:bg-green-600' : '[&>div]:bg-amber-500'
          }`}
        />
      </div>
    </div>
  )
}