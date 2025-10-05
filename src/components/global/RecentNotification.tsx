import type { LucideProps } from 'lucide-react'

export default function RecentNotification({
  icon,
  newAlert,
}: {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  newAlert?: boolean
}) {
  const IconComponent = icon
  return (
    <div className="relative">
      <IconComponent className="w-5 h-5" />
      {newAlert && (
        <span className="border border-background bg-red-600 rounded-full absolute top-0 right-0 w-2 h-2" />
      )}
    </div>
  )
}
