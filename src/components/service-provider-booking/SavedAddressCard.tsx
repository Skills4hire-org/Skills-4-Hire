import { MapPin } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { handleBookingInfo } from '@/features/booking/bookingSlice'
import type { Address, BookingInfo } from '@/types/bookings.type'
import DeleteAddressDialog from './DeleteAddressDialog'

export default function SavedAddressCard({ address }: { address: Address }) {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState,
  )
  const dispatch = useDispatch()
  const selectSavedLocation = (checked: any) => {
    if (checked) {
      dispatch(
        handleBookingInfo({
          info: {
            address,
          },
        }),
      )
    } else {
      dispatch(
        handleBookingInfo({
          info: {
            address: null,
          },
        }),
      )
    }
  }

  return (
    <div className="flex gap-2 w-full items-start">
      <div className="space-y-2 border px-1 py-2 flex-1 rounded-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm md:text-base">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <Checkbox
            className="data-[state=checked]:bg-primary data-[state=checked]:text-white border border-gray-500"
            disabled={info.is_remote}
            checked={info.address?.address_id == address.address_id}
            onCheckedChange={(checked) => selectSavedLocation(checked)}
          />
        </div>
        <div className="flex items-end justify-between gap-2 md:gap-4">
          <div className="space-y-1">
            <p className="text-sm md:text-base">{address.street_address},</p>
            <span className="text-sm md:text-base">{address.city}</span>,
            <span className="text-sm md:text-base ml-1">{address.state}</span>.
          </div>
        </div>
      </div>
      <DeleteAddressDialog address_id={address.address_id} />
    </div>
  )
}
