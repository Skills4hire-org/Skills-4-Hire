import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import FormInput from '../form-fields/FormInput'
import { Button } from '../ui/button'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { applicationProfileFormSchema } from '@/utils/schemas'
import { completeOnboard, selectRole } from '@/api/onboard'
import type { Registration } from '@/types/onboard.types'
import FormSelect from '../form-fields/FormSelect'
import { serviceTypes } from '@/assets/data'
import {
  clearForm,
  completeProfile,
} from '@/features/registration/registrationSlice'

export default function ApplicationProfileForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { additionalInfo }: Registration = useSelector(
    (state: any) => state.registrationState,
  )

  const { service, country, city, address, dateOfBirth, headline, state } =
    additionalInfo
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      completeProfile({
        additionalInfo: { [field]: value },
      }),
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const valid = useValidateSchema(
      applicationProfileFormSchema,
      additionalInfo,
    )

    if (!valid) return

    setSubmitting(true)

    try {
      const profilePayload = {
        professional_title: additionalInfo.service,
        headline,
        profile: {
          country,
          city,
          location: address,
        },
        date_of_birth: dateOfBirth,
      }
      await completeOnboard(profilePayload)
      await selectRole('SERVICE_PROVIDER')
      toast.success('Registration successful!')
      dispatch(clearForm())
      navigate('/professional/home')
    } catch (error: any) {
      toast.error(error?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <FormSelect
        label="What skill/service do you want to offer?"
        name="service"
        value={service}
        handleInputChange={handleInputChange}
        selectItems={serviceTypes}
        className="capitalize bg-transparent pb-1 pl-3 pr-6 h-9 pt-0  [&>svg]:hidden "
        align="end"
        selectContentClassName="bg-gray-300 shadow-none rounded-none border-0 absolute   break-all w-66 -right-0.5"
        selectItemClassName="place-content-center w-64 rounded-none px-4"
        sideOffset={-4}
        indicator
        required
      />
      <FormInput
        name="country"
        label="Country/Region"
        value={country}
        handleInputChange={handleInputChange}
        type="text"
        required
      />
      <FormInput
        name="state"
        label="State"
        value={state}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="city"
        label="City"
        value={city}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="address"
        label="Address"
        value={address}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        handleInputChange={handleInputChange}
        type="date"
        className="h-9"
        required
      />

      <FormInput
        name="headline"
        label="Headline/Description"
        value={headline}
        handleInputChange={handleInputChange}
        type="text"
        maxLength={90}
        required
      />

      <div className="flex items-center justify-between mt-6">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className=" py-4"
          disabled={submitting}
        >
          Back
        </Button>
        <Button className="py-4     " disabled={submitting}>
          {submitting ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  )
}
