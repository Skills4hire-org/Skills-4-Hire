import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          name="firstName"
          label="First Name"
          value={formData.firstName}
          handleInputChange={handleInputChange}
          type="text"
          placeholder="Enter first name"
          required
          labelSize="text-xs md:text-sm"
          className="placeholder:text-xs placeholder:md:text-sm"
        />
        <FormInput
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          handleInputChange={handleInputChange}
          type="text"
          placeholder="Enter last name"
          required
          labelSize="text-xs md:text-sm"
          className="placeholder:text-xs placeholder:md:text-sm"
        />
      </div>
      <FormInput
        name="email"
        label="Email"
        value={formData.email}
        handleInputChange={handleInputChange}
        type="email"
        placeholder="Enter email"
        required
        labelSize="text-xs md:text-sm"
        className="placeholder:text-xs placeholder:md:text-sm"
      />
      <FormTextArea
        name="message"
        label="Message"
        value={formData.message}
        rows={4}
        handleInputChange={handleInputChange}
        required
        className="min-h-32"
        placeholder="Message..."
      />
      <FormSubmitButton
        submitting={false}
        text="Send message"
        texting="sending"
        className="w-full font-normal"
      />
    </form>
  )
}
