import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface BookingRequestDialogProp {
  handleBookingRequest: (value: string) => void
  isPending: boolean
  acceptOpen: boolean
  setAcceptOpen: (value: boolean) => void
}

export default function AcceptBookingRequestDialog({
  handleBookingRequest,
  isPending,
  acceptOpen,
  setAcceptOpen,
}: BookingRequestDialogProp) {
  return (
    <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md bg-green-600 hover:opacity-90 py-2 text-white font-medium text-sm md:text--base cursor-pointer w-full">
          Accept
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle>Accept Booking Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this request?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="rounded-md bg-gray-600 hover:opacity-90 py-2 px-4 text-white font-medium text-sm md:text-base cursor-pointer"
            disabled={isPending}
            onClick={() => setAcceptOpen(false)}
          >
            Close
          </button>
          <button
            className="rounded-md bg-green-600 hover:opacity-90 py-2 px-4 text-white font-medium text-sm md:text-base cursor-pointer"
            disabled={isPending}
            onClick={() => handleBookingRequest('accept')}
          >
            {' '}
            {isPending ? 'Accepting...' : 'Accept'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
