import { Bell } from 'lucide-react'
import { timeFormatter } from '@/utils/format'

export default function NotificationCard({
  event,
  content,
  createdAt,
  isRead,
  onRead,
}: {
  event?: string | null
  content?: string | null
  createdAt: number | string
  isRead: boolean
  onRead?: () => void
}) {
  const title = event?.replaceAll('_', ' ') || 'Notification'
  return (
    <button
      type="button"
      onClick={onRead}
      className={`w-full text-left rounded-lg py-1.5 px-3 md:px-6 md:py-3 flex gap-2 md:gap-4 items-center ${isRead ? 'bg-gray-100' : 'bg-gray-300'}`}
    >
      <Bell className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
      <div className="flex-1 flex items-center justify-between gap-4">
        <div className="space-y-0.5 md:space-y-1">
          <h3 className="font-medium text-sm md:text-base capitalize">{title}</h3>
          <p className="text-xs md:text-sm pb-0.5 md:pb-0">{content || 'You have a new update.'}</p>
        </div>
        <time className="text-xs md:text-sm shrink-0">
          {timeFormatter(createdAt)}
        </time>
      </div>
    </button>
  )
}
