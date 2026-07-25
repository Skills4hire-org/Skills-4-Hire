import ProfileImage from '@/components/global/ProfileImage'
import { MapPin, Clock, Wallet, Check, X, MessageSquare } from 'lucide-react'
import { dateFormatter, timeFormatter, currencyFormatter } from '@/utils/format'
import type { Booking } from '@/types/bookings.type'

export default function JobCard({
  customer,
  provider,
  created_at,
  descriptions,
  price,
  booking_status,
}: Booking) {
  return (
    <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 md:space-y-3 w-full">
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          <ProfileImage
            noStatus
            size="size-10 md:size-12"
            avatar={customer?.profile?.avatar?.avatar}
          />
        </div>

        <div className="flex-1 space-y-0.5">
          <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
            {customer?.profile?.display_name}
          </p>

          <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{provider?.professional_title}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-gray-50">
            <Clock className="w-3.5 h-3.5" />
            {dateFormatter(created_at)}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-gray-50">
            {timeFormatter(created_at)}
          </span>
        </div>

        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
          {descriptions}
        </p>
      </div>

      {price !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="font-semibold text-gray-900">
            {currencyFormatter(Number(price))}
          </span>
        </div>
      )}

      <div className="pt-1">
        {booking_status === 'In_progress' && (
          <div className="flex gap-2">
            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md bg-green-600 text-white text-sm md:text-base hover:bg-green-700 transition font-medium cursor-pointer">
              <Check className="w-4 h-4" />
              <span>Complete</span>
            </button>
            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition font-medium cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
        )}

        {booking_status === 'Pending' && (
          <div className="flex gap-2">
            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md bg-green-600 text-white text-sm md:text-base hover:bg-green-700 transition font-medium cursor-pointer">
              <Check className="w-4 h-4" />
              <span>Accept</span>
            </button>
            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md border border-red-300 text-red-600 text-sm md:text-base hover:bg-red-50 transition font-medium cursor-pointer">
              <X className="w-4 h-4" />
              <span>Decline</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
