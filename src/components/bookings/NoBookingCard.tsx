import { Menu } from 'lucide-react'
import { PiBook } from 'react-icons/pi'
export default function NoBookingCard({ label }: { label: string }) {
  return (
    <div className="space-y-12 max-w-4xl mx-auto text-center py-20">
      <div className="relative w-max mx-auto">
        <Menu className="w-20 h-20 rounded-xl text-white pt-1 pb-4 bg-primary" />
        <PiBook className="w-20 h-20 text-primary bg-background top-8 left-1/2 absolute rounded-xl" />
      </div>
      <p className="text-sm sm:text-base">{label} bookings will show up here</p>
    </div>
  )
}
