import FormInput from '../form-fields/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { handleBookingInfo } from '@/features/booking/bookingSlice'
import type { BookingInfo } from '@/types/bookings.type'

export default function AddressForm() {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState,
  )
  const dispatch = useDispatch()

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      handleBookingInfo({
        info: {
          new_address: {
            ...info.new_address,
            [field]: value,
            country: 'Nigeria',
          },
          address: null,
        },
      }),
    )
  }

  return (
    <form className="w-full max-w-xl mx-auto space-y-6">
      <div className="space-y-3 md:space-y-4">
        <FormInput
          name="street_address"
          value={info.new_address?.street_address ?? ''}
          handleInputChange={handleInputChange}
          type="text"
          required
          className="bg-gray-300 capitalize h-11 pl-4 pr-6"
          placeholder="Address"
          label="Address"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <FormInput
            name="city"
            value={info.new_address?.city ?? ''}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="City"
            label="City"
          />
          <FormInput
            name="state"
            value={info.new_address?.state ?? ''}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="State"
            label="State"
          />
        </div>
      </div>
    </form>
  )
}
