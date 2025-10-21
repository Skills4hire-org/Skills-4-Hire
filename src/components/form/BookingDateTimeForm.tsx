import { type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { Label } from '../ui/label'
import { Timer } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import FormTextArea from '../form-fields/FormTextArea'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { handleBookingInfo, handleSteps } from '@/features/booking/bookingSlice'
import type { BookingInfo } from '@/utils/types'

export default function BookingDateTimeForm() {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState
  )
  const dispatch = useDispatch()
  const handleInputChange = (field: string, value: string) => {
    dispatch(
      handleBookingInfo({
        info: {
          [field]: value,
        },
      })
    )
  }
  const handleEmergencyService = (checked: any) => {
    dispatch(
      handleBookingInfo({
        info: {
          emergency: checked,
        },
      })
    )
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(handleSteps({ step: 2 }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-center justify-between mb-2">
        <FormInput
          type="date"
          name="date"
          required
          value={info.date}
          handleInputChange={handleInputChange}
          label="Enter date"
          className="rounded-none"
        />
        <FormInput
          type="time"
          name="time"
          required
          value={info.time}
          handleInputChange={handleInputChange}
          label="Enter time"
          className="rounded-none"
        />
      </div>
      <div className="text-white bg-primary rounded flex items-center justify-between px-0.5 mb-4">
        <Label htmlFor="emergency">
          emergency service?
          <Timer />
        </Label>
        <Checkbox
          name="emergency"
          id="emergency"
          checked={info.emergency}
          onCheckedChange={(checked) => handleEmergencyService(checked)}
        />
      </div>
      <div className="relative mb-6">
        <Label
          htmlFor="notes"
          className="underline absolute font-semibold left-2 top-1 text-base"
        >
          Notes
        </Label>
        <FormTextArea
          name="notes"
          value={info.notes}
          rows={6}
          handleInputChange={handleInputChange}
          className="rounded-none text-sm md:text-base min-h-32 pt-8"
        />
      </div>
      <div className="text-center">
        <Button
          type="submit"
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          disabled={!info.date || !info.time}
        >
          Next
        </Button>
      </div>
    </form>
  )
}
