import type { LucideProps } from 'lucide-react'

export default function RecentNotification({
  icon,
  count = 0,
}: {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  count?: number
}) {
  const IconComponent = icon
  return (
    <div className="relative">
      <IconComponent className="w-5 h-5" />
      {count > 0 && (
        <span className="border-2 border-background bg-red-600 min-w-4 h-4 px-1 rounded-full absolute -top-2 -right-2 text-[10px] leading-3.5 text-white text-center font-semibold">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}
