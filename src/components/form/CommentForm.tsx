import { useState, type FormEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import ProfileImage from '../global/ProfileImage'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function CommentForm() {
  const [formData, setFormData] = useState({
    comment: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-5 md:mb-6">
      <div>
        <ProfileImage size="size-8 md:size-10" noStatus />
      </div>

      <div className="relative flex-1">
        <FormTextArea
          name="comment"
          value={formData?.comment}
          placeholder="Add a comment"
          rows={3}
          required
          handleInputChange={handleInputChange}
          className="pb-12 min-h-18 md:min-h-20 h-max text-xs md:text-sm"
        />
        <FormSubmitButton
          submitting={false}
          text="comment"
          texting="submitting"
          className="absolute right-3 bottom-2 h-7 md:h-8 rounded-sm capitalize"
          disabled={!formData.comment}
        />
      </div>
    </form>
  )
}
