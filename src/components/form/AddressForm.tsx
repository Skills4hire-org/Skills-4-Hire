import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { useAddAddress } from '@/hooks/useBookings'
import { toast } from 'sonner'

export default function AddressForm({ is_remote }: { is_remote: boolean }) {
  const [formData, setFormData] = useState({
    street_address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    is_default: true,
  })
  const { mutate: addAddress, isPending } = useAddAddress()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addAddress(formData, {
      onSuccess: () => {
        toast.success('Address added successfully')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      <div className="space-y-3 md:space-y-4">
        <FormInput
          name="street_address"
          value={formData.street_address}
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
        <FormSubmitButton
          texting="adding"
          text="Add Address"
          submitting={isPending}
          className="capitalize min-w-20"
          disabled={is_remote}
        />
      </div>
    </form>
  )
}
