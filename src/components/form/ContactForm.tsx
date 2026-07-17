import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Wire up to a backend or email service before going to production.
    // Options: Resend (https://resend.com), EmailJS, or Formspree.
    // The form fields are: fullName, email, phone, message.
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        handleInputChange={handleInputChange}
        type="text"
        placeholder="Enter Your Full Name"
        required
        labelSize="text-sm font-bold text-slate-800"
        className="placeholder:text-sm h-12 rounded-lg border-0 shadow-sm bg-white"
      />
      <FormInput
        name="email"
        label="Email Address"
        value={formData.email}
        handleInputChange={handleInputChange}
        type="email"
        placeholder="Enter Your Email Address"
        required
        labelSize="text-sm font-bold text-slate-800"
        className="placeholder:text-sm h-12 rounded-lg border-0 shadow-sm bg-white"
      />
      <FormInput
        name="phone"
        label="Phone Number"
        value={formData.phone}
        handleInputChange={handleInputChange}
        type="tel"
        placeholder="Enter Your Phone Number"
        required
        labelSize="text-sm font-bold text-slate-800"
        className="placeholder:text-sm h-12 rounded-lg border-0 shadow-sm bg-white"
      />
      <FormTextArea
        name="message"
        label="Message"
        value={formData.message}
        rows={5}
        handleInputChange={handleInputChange}
        required
        className="min-h-32 placeholder:text-sm rounded-lg border-0 shadow-sm bg-white"
        placeholder="Write Your Message Here"
        labelSize="text-sm font-bold text-slate-800"
      />
      <FormSubmitButton
        submitting={false}
        text="Send Message"
        texting="Sending"
        className="px-6 py-2.5 h-auto font-medium rounded-md w-auto"
      />
    </form>
  )
}
