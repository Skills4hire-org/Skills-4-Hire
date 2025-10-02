import type { LucideProps } from 'lucide-react'

export default function RecentNotification({
  icon,
  size,
}: {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  size: 'base' | 'lg'
}) {
  const IconComponent = icon
  return (
    <div className="relative">
      <IconComponent className={`${size === 'base' ? 'w-4 h4' : 'w-6 h-6'}`} />
      <span className="border border-background bg-red-600 w-2 h-2 rounded-full absolute top-0 right-0" />
    </div>
  )
}
