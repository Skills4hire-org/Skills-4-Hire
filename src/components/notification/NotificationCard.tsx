import { getNotificationDetails, timeFormatter } from '@/utils/format'

export default function NotificationCard({
  type,
  createdAt,
}: {
  type: string
  createdAt: number | string
}) {
  const notificationDetails = getNotificationDetails[type]
  const { title, message, icon, className } = notificationDetails
  const IconComponent = icon
  return (
    <div className="bg-gray-300 rounded-lg py-1.5 px-3 md:px-6 md:py-3 flex gap-2 md:gap-4 items-center">
      <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${className}`} />
      <div className="flex-1 flex items-center justify-between gap-4">
        <div className="space-y-0.5 md:space-y-1">
          <h3 className="font-medium text-sm md:text-base">{title}</h3>
          <p className="text-xs md:text-sm pb-0.5 md:pb-0">{message}</p>
        </div>
        <time className="text-xs md:text-sm shrink-0">
          {timeFormatter(createdAt)}
        </time>
      </div>
    </div>
  )
}
