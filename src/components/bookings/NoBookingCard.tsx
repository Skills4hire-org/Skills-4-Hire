import { Menu } from 'lucide-react'

export default function NoBookingCard({ label }: { label: string }) {
  return (
    <div className="space-y-2 md:space-y-4 max-w-4xl mx-auto text-center py-20">
      <Menu className="w-20 md:w-24 md:h-24 h-20 mx-auto rounded-xl text-white pt-1 pb-4 bg-primary" />

      <p className="text-sm md:text-base">{label} bookings will show up here</p>
    </div>
  )
}
