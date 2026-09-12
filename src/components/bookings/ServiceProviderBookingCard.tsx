import {
  dateFormatter,
  formatSpaceToString,
  timeFormatter,
} from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import defaultImage from '../../assets/images/profile.jpg'
import type { Booking } from '@/types/bookings.type'
import RejectBookingRequestDialog from './RejectBookinRequestDialog'
import { useBookingAction } from '@/hooks/useBookings'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ServiceProviderBookingCard({
  customer,
  provider,
  created_at,
  descriptions,
  booking_id,
  booking_status,
}: Booking) {
  const { mutate: bookingAction, isPending } = useBookingAction()

  const [rejectOpen, setRejectOpen] = useState(false)

  const handleBookingRequest = (action: string) => {
    bookingAction(
      {
        id: booking_id,
        action,
      },
      {
        onSuccess: () => {
          toast.success('Booking canceled!')
          setRejectOpen(false)
        },
        onError: (error) => {
          toast.error(error?.message)
          setRejectOpen(true)
        },
      },
    )
  }

  return (
    <div className="space-y-2 md:space-y-4 max-w-xl mx-auto ">
      <div className="flex items-center justify-between gap-8 border-y px-2">
        <div className="flex flex-col gap-1">
          <h3 className="capitalize font-medium ">
            {formatSpaceToString(provider?.professional_title)}
          </h3>
          <div className="text-muted-foreground text-base">
            Date:{' '}
            <span className="text-foreground text-sm">
              {dateFormatter(created_at)}
            </span>
          </div>
          <div className="text-muted-foreground text-base">
            Time:{' '}
            <span className="text-foreground text-sm">
              {timeFormatter(created_at)}
            </span>
          </div>
        </div>
        <figure>
          <img
            src={provider?.user?.profile?.avatar?.avatar ?? defaultImage}
            alt={provider?.user?.profile?.display_name}
            className="aspect-square object-cover h-full max-w-24 md:max-w-42"
            loading="lazy"
          />
        </figure>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">
          Booking Description
        </h3>
        <p className="text-xs text-muted-foreground">{descriptions}</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base mb-1">
          About Customer
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <ProfileImage noStatus avatar={customer?.profile?.avatar?.avatar} />
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs">{customer?.profile?.display_name}</h4>
          </div>
        </div>
      </div>
      {booking_status == 'In_progress' && (
        <div className="flex items-center justify-end gap-2 md:gap-4">
          <div className="w-1/2">
            <RejectBookingRequestDialog
              handleBookingRequest={handleBookingRequest}
              isPending={isPending}
              rejectOpen={rejectOpen}
              setRejectOpen={setRejectOpen}
              label="cancel"
            />
          </div>
        </div>
      )}
    </div>
  )
}
