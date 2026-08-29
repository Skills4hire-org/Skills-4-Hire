import {
  dateFormatter,
  formatSpaceToString,
  timeFormatter,
} from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import defaultImage from '../../assets/images/profile.jpg'
import type { Booking } from '@/types/bookings.type'
import { useBookingAction } from '@/hooks/useBookings'
import { toast } from 'sonner'
import RejectBookingRequestDialog from './RejectBookinRequestDialog'
import { useState } from 'react'
import AcceptBookingRequestDialog from './AcceptBookingRequestDialog'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'

export default function BookingRequestCard({
  customer,
  provider,
  created_at,
  descriptions,
  booking_id,
}: Booking) {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { mutate: bookingAction, isPending } = useBookingAction()
  const [acceptOpen, setAcceptOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const handleBookingRequest = (action: string) => {
    bookingAction(
      {
        id: booking_id,
        action,
      },
      {
        onSuccess: () => {
          toast.success(
            `${action == 'accept' ? 'Booking request accepted!' : 'Booking request rejected!'}`,
          )
          if (action == 'accept') {
            setAcceptOpen(false)
          } else {
            setRejectOpen(false)
          }
        },
        onError: (error) => {
          toast.error(error?.message)
          if (action == 'accept') {
            setAcceptOpen(true)
          } else {
            setRejectOpen(true)
          }
        },
      },
    )
  }

  return (
    <div className="space-y-2 md:space-y-4 max-w-xl mx-auto">
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
      <div className="flex items-center justify-end gap-2 md:gap-4">
        {userType == 'professional' && (
          <div className="w-1/2">
            <AcceptBookingRequestDialog
              handleBookingRequest={handleBookingRequest}
              isPending={isPending}
              acceptOpen={acceptOpen}
              setAcceptOpen={setAcceptOpen}
            />
          </div>
        )}
        <div className="w-1/2">
          <RejectBookingRequestDialog
            handleBookingRequest={handleBookingRequest}
            isPending={isPending}
            rejectOpen={rejectOpen}
            setRejectOpen={setRejectOpen}
          />
        </div>
      </div>
    </div>
  )
}
