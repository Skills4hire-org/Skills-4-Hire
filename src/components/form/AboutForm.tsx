import { useState, type FormEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Button } from '../ui/button'

export default function AboutForm({
  setIsOpen,
  about,
}: {
  setIsOpen: (value: boolean) => void
  about: string
}) {
  const [formData, setFormData] = useState({
    about,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
    } catch (error: any) {}
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      <FormTextArea
        name="about"
        value={formData.about}
        rows={6}
        required
        handleInputChange={handleInputChange}
        className="pb-12 min-h-32 md:min-h-40 h-max text-sm md:text-base"
      />
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
          texting="submitting"
          text="submit"
          submitting={false}
          disabled={!formData.about}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
