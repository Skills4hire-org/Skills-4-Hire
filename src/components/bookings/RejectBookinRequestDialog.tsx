import type { UserType } from '@/types/user.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useSelector } from 'react-redux'

interface BookingRequestDialogProp {
  handleBookingRequest: (value: string) => void
  isPending: boolean
  rejectOpen: boolean
  setRejectOpen: (value: boolean) => void
  label?: string
}

export default function RejectBookingRequestDialog({
  handleBookingRequest,
  isPending,
  rejectOpen,
  setRejectOpen,
  label,
}: BookingRequestDialogProp) {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const text = userType == 'customer' ? 'cancel' : 'reject'
  return (
    <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md bg-red-600 hover:opacity-90 py-2 text-white font-medium text-sm md:text--base cursor-pointer w-full capitalize">
          {label || text}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="capitalize">{`${label || text} Booking Request`}</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to ${label || text} this request?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="rounded-md bg-gray-600 hover:opacity-90 py-2 px-4 text-white font-medium text-sm md:tex t-base cursor-pointer"
            disabled={isPending}
            onClick={() => setRejectOpen(false)}
          >
            Close
          </button>
          <button
            className="rounded-md bg-red-600 hover:opacity-90 py-2 px-4 text-white font-medium text-sm md:text-base cursor-pointer capitalize"
            disabled={isPending}
            onClick={() => handleBookingRequest('reject')}
          >
            {isPending ? `${label}ing || ${text}ing` : label || text}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
