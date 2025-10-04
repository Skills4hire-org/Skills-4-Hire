import type { LucideProps } from 'lucide-react'

export default function RecentNotification({
  icon,
  size,
  newAlert,
}: {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  size: 'base' | 'lg'
  newAlert?: boolean
}) {
  const IconComponent = icon
  return (
    <div className="relative">
      <IconComponent className={`${size === 'base' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      {newAlert && (
        <span className="border border-background bg-red-600 w-2 h-2 rounded-full absolute top-0 right-0" />
      )}
    </div>
  )
}
