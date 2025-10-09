import { formatRelativeTime } from '@/utils/format'
import { Check, HandCoins } from 'lucide-react'

export default function RewardCard({
  createdAt,
  point,
}: {
  createdAt: any
  point: number
}) {
  return (
    <div className="flex items-center gap-2">
      <HandCoins className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col md:gap-0.5">
          <span className="text-xs md:text-sm">
            {formatRelativeTime(createdAt)}
          </span>
          <span className="text-base md:text-lg font-medium">
            {point} point{point > 1 && 's'}
          </span>
        </div>
        <div className="p-1 bg-primary text-white rounded-full">
          <Check strokeWidth={3} className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  )
}
