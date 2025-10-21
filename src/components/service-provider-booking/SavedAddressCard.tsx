import { MapPin } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { handleBookingInfo } from '@/features/booking/bookingSlice'
import type { BookingInfo } from '@/utils/types'

export default function SavedAddressCard({ address }: { address: string }) {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState
  )
  const dispatch = useDispatch()
  const selectSavedLocation = (checked: any) => {
    if (checked) {
      dispatch(
        handleBookingInfo({
          info: {
            savedAddress: address,
          },
        })
      )
    } else {
      dispatch(
        handleBookingInfo({
          info: {
            savedAddress: '',
          },
        })
      )
    }
  }
  return (
    <div className="space-y-2 border px-1 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm md:text-base">
          <MapPin className="w-5 h-5 md:w-6 md:h-6" />
          <span>Home</span>
        </div>
        <Checkbox
          className="data-[state=checked]:bg-background data-[state=checked]:text-primary "
          disabled={info.address !== '' || info.type === 'remote'}
          checked={info.savedAddress !== ''}
          onCheckedChange={(checked) => selectSavedLocation(checked)}
        />
      </div>
      <p className="text-sm md:text-base">{address}</p>
    </div>
  )
}
