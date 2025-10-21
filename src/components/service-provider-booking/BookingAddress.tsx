import type { BookingInfo } from '@/utils/types'
import SectionHeading from './SectionHeading'
import Container from '../global/Container'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { workTypes } from '@/assets/data'
import { handleBookingInfo, handleSteps } from '@/features/booking/bookingSlice'
import FormInput from '../form-fields/FormInput'
import { user } from '@/utils/database'
import SavedAddressCard from './SavedAddressCard'

export default function BookingAddress() {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState
  )
  const workType = info.type
  const dispatch = useDispatch()
  const selectWorkType = (type: string) => {
    dispatch(
      handleBookingInfo({
        info: {
          type,
        },
      })
    )
  }
  const handleStep = (step: number) => {
    dispatch(handleSteps({ step }))
  }

  const handleNext = () => {
    if (workType === 'remote') {
      dispatch(
        handleBookingInfo({
          info: {
            address: '',
            savedAddress: '',
          },
        })
      )
    }
    handleStep(3)
  }

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      handleBookingInfo({
        info: {
          [field]: value,
        },
      })
    )
  }
  return (
    <>
      <Container>
        <div className="flex items-center gap-10 justify-start md:justify-center md:gap-14">
          {workTypes.map((type) => {
            return (
              <div
                key={type}
                className="flex items-center gap-1.5"
                onClick={() => selectWorkType(type)}
              >
                <Button
                  variant={`${workType === type ? 'default' : 'outline'}`}
                  className="rounded-full w-3 h-3 p-0 transition"
                >
                  <span className="sr-only">{type}</span>
                </Button>
                <span className="text-sm capitalize">{type}</span>
              </div>
            )
          })}
        </div>
      </Container>

      <SectionHeading title="Enter Address" />
      <Container>
        <FormInput
          type="text"
          name="address"
          value={info.address}
          placeholder="Enter your address"
          handleInputChange={handleInputChange}
          className="rounded-none h-14 p-4"
          disabled={info.savedAddress !== '' || workType === 'remote'}
        />
      </Container>
      <SectionHeading title="Saved Locations" />
      <Container>
        {user?.savedAddresses?.map((address) => (
          <SavedAddressCard key={address} address={address} />
        ))}
      </Container>
      <div className="text-center space-x-6 md:space-x-10 mt-8 md:mb-8">
        <Button
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          onClick={() => handleStep(1)}
        >
          Previous
        </Button>
        <Button
          type="submit"
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          disabled={
            workType == null ||
            (workType === 'onsite' && !info.address && !info.savedAddress)
          }
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  )
}
