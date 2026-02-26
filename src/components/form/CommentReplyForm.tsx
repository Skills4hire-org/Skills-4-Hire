import { useState, type FormEvent } from 'react'
import ProfileImage from '../global/ProfileImage'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function CommentReplyForm({
  setShowReplyForm,
}: {
  setShowReplyForm: (value: boolean) => void
}) {
  const [formData, setFormData] = useState({
    reply: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-t border-gray-100 pt-4"
    >
      <div>
        <ProfileImage size="size-8 md:size-10" noStatus />
      </div>
      <div className="flex-1">
        <FormTextArea
          name="reply"
          value={formData?.reply}
          placeholder="Write a thoughtful reply..."
          rows={3}
          required
          handleInputChange={handleInputChange}
          className="pb-12 min-h-12 md:min-h-16 h-max text-sm md:text-base"
        />
        <div className="flex justify-end gap-2 mt-2 md:mt-4">
          <button
            onClick={() => setShowReplyForm(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer h-8"
          >
            Cancel
          </button>
          <FormSubmitButton
            submitting={false}
            text="Post a reply"
            texting="replying"
            className="h-8"
            disabled={!formData.reply}
            size="sm"
          />
        </div>
      </div>
    </form>
  )
}
