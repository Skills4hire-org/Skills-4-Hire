import { type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { Button } from '../ui/button'
import type { Registration, RequiredFormData } from '@/utils/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  addApplicationProfile,
  clearForms,
} from '@/features/registration/registrationSlice'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { applicationProfileFormSchema } from '@/utils/schemas'
import {
  setServiceProviderStatus,
  setUserType,
} from '@/features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function ApplicationProfileForm() {
  const { personalInfo, experience, applicationProfile }: Registration =
    useSelector((state: any) => state.registrationState)
  const { country, city, address, dateOfBirth, headline } = applicationProfile
  const requiredFormData: RequiredFormData = {
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    phone: personalInfo.phone,
    nin: personalInfo.nin,
    service: experience.service,
    ...applicationProfile,
  }
  const requiredFields: (keyof RequiredFormData)[] = [
    'firstName',
    'lastName',
    'phone',
    'nin',
    'service',
    'country',
    'city',
    'address',
    'dateOfBirth',
    'headline',
  ]

  const calculateCompletionPercentage = () => {
    const filledFields = requiredFields.filter((key) => {
      const value = requiredFormData[key]

      if (key == 'nin') {
        return value?.length === 10
      }
      if (key == 'headline') {
        return value && value.length >= 25
      }
      return value !== undefined && value !== ''
    })
    const percentage = 20 + (filledFields.length / requiredFields.length) * 80
    return percentage
  }
  const percentageCompletion = calculateCompletionPercentage()

  const dispatch = useDispatch()
  const handleInputChange = (field: string, value: string) => {
    dispatch(
      addApplicationProfile({
        applicationProfile: {
          [field]: value,
        },
      })
    )
  }
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validateData = useValidateSchema(
      applicationProfileFormSchema,
      applicationProfile
    )
    if (!validateData) {
      return
    }
    //handle creation of account on database
    toast.success('Registration successful!')
    dispatch(
      setServiceProviderStatus({
        serviceProviderStatus: true,
      })
    )
    dispatch(
      setUserType({
        userType: 'service-provider',
      })
    )
    dispatch(clearForms())
    navigate('/service-provider/profile')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <FormInput
        name="country"
        label="Country/Region"
        value={country}
        handleInputChange={handleInputChange}
        type="text"
        className="bg-transparent pb-1 px-3 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none"
        placeholder=""
        required
      />
      <FormInput
        name="city"
        label="City"
        value={city}
        handleInputChange={handleInputChange}
        type="text"
        className="bg-transparent pb-1 px-3 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none"
        placeholder=""
        required
      />
      <FormInput
        name="address"
        label="Address"
        value={address}
        handleInputChange={handleInputChange}
        type="text"
        className="bg-transparent pb-1 px-3 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none"
        placeholder=""
        required
      />

      <FormInput
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        handleInputChange={handleInputChange}
        type="date"
        className="bg-transparent pb-1 pl-3 pr-0 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none"
        placeholder=""
        required
      />
      <FormInput
        name="headline"
        label="Headline"
        value={headline}
        handleInputChange={handleInputChange}
        type="text"
        maxLength={90}
        className={`bg-transparent pb-1 px-3 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none ${
          headline.length > 0 && headline.length < 25
            ? 'focus-visible:border-destructive border-b-destructive '
            : 'focus-visible:border-primary '
        }`}
        placeholder=""
        required
      />

      <div className=" max-w-xs mx-auto mt-6">
        <Button className="py-4 w-full" disabled={percentageCompletion !== 100}>
          Register
        </Button>
      </div>
    </form>
  )
}
