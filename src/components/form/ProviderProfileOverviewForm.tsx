import type { Profile, ProfileOverviewFormData } from '@/types/user.types'
import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { Minus } from 'lucide-react'
import FormSelect from '../form-fields/FormSelect'
import { serviceTypes } from '@/assets/data'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Button } from '../ui/button'

export default function ProviderProfileOverviewForm({
  professional,
  setIsOpen,
}: {
  professional: Profile | undefined
  setIsOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<ProfileOverviewFormData>({
    firstName: professional?.user?.first_name,
    lastName: professional?.user?.last_name,
    profileImage: professional?.user?.profile.avatar?.avatar,
    profession: professional?.professional_title,
    headline: professional?.headline,
    minCharge: professional?.min_charge,
    maxCharge: professional?.max_charge,
    address: professional?.user?.profile.location,
    city: professional?.user?.profile.city,
    state: professional?.user?.profile.state,
  })

  const handleInputChange = (field: string, value: string) => {
    if (field === 'minCharge' || field === 'maxCharge') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev: any) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev: any) => ({ ...prev, [field]: value }))
    }
  }
  /* const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFile = e.target.files
    if (!selectedFile) return
    const isOverSize = selectedFile[0].size > MAX_SIZE_MB
    if (isOverSize) return
    const validImage = URL.createObjectURL(selectedFile[0])
    setFormData({ ...formData, profileImage: validImage })
  } */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      {/* <div className="text-center space-y-2">
        <figure className="rounded-xl w-max mx-auto  relative">
          <img
            src={formData?.profileImage}
            alt={professional?.profile?.display_name}
            className="aspect-square object-cover w-32 md:w-36 rounded-xl "
            loading="lazy"
          />
          <FormImage
            name="profileImage"
            className="absolute bottom-2 left-2"
            handleImageChange={handleImageChange}
          />
        </figure>
      </div> */}
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <FormInput
            name="firstName"
            value={formData.firstName}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pr-6 pl-4"
            placeholder="First Name"
            label="First Name"
          />

          <FormInput
            name="lastName"
            value={formData.lastName}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pr-6 pl-4"
            placeholder="Last Name"
            label="Last Name"
          />
        </div>

        <FormSelect
          name="profession"
          value={formData.profession}
          handleInputChange={handleInputChange}
          selectItems={serviceTypes}
          className="capitalize bg-gray-300 h-[44px] pr-6 disabled:cursor-auto"
          required
          placeholder="Profession"
          label="Profession"
        />

        <FormInput
          name="headline"
          value={formData?.headline}
          handleInputChange={handleInputChange}
          type="email"
          required
          className="bg-gray-300 h-11 pl-4 pr-6 "
          placeholder="Headline"
          label="Headline"
        />

        <div className="flex items-center gap-2 max-w-sm mx-auto">
          <FormInput
            name="minCharge"
            value={formData.minCharge}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="Min. Charge"
            label="Min. Charge"
          />

          <Minus className="w-4 h-4 mt-6" />

          <FormInput
            name="maxCharge"
            value={formData.maxCharge}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="Max. Charge"
            label="Max. Charge"
          />
        </div>
        <FormInput
          name="Address"
          value={formData.address}
          handleInputChange={handleInputChange}
          type="text"
          required
          className="bg-gray-300 capitalize h-11 pl-4 pr-6"
          placeholder="Address"
          label="Address"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <FormInput
            name="City"
            value={formData.city}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="City"
            label="City"
          />
          <FormInput
            name="state"
            value={formData.state}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pl-4 pr-6"
            placeholder="State"
            label="State"
          />
        </div>
      </div>
      <div className="ml-auto w-max flex items-center gap-2">
        <Button
          variant="destructive"
          className="w-20"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          Close
        </Button>
        <FormSubmitButton
          texting="updating"
          text="update profile"
          submitting={false}
          className="capitalize min-w-20"
        />
      </div>
    </form>
  )
}
