import { useState } from 'react'
import FormInput from '../form-fields/FormInput'
import ProfileImage from '../global/ProfileImage'
import FormTextArea from '../form-fields/FormTextArea'
import FormSelect from '../form-fields/FormSelect'
import { timeFrameOptions } from '@/assets/data'
import { ImageIcon, Paperclip } from 'lucide-react'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function CustomerPostComposer() {
  const [formData, setFormData] = useState({
    post: '',
    budget: '',
    timeFrame: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  return (
    <form className="bg-white rounded-md space-y-4 p-2 pb-6 md:p-4 md:pb-12 shadow-md">
      <div className="flex gap-2">
        <ProfileImage noStatus />
        <div className="flex-1 flex  flex-col gap-2 md:gap-4">
          <FormTextArea
            name="post"
            placeholder="What job do you want to get done?"
            value={formData.post}
            handleInputChange={handleInputChange}
            className="text-sm md:text-base"
            rows={3}
            required
          />
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <FormInput
              name="budget"
              placeholder="10,000"
              label="Budget Amount (₦)"
              required
              value={formData.budget}
              type="number"
              handleInputChange={handleInputChange}
              className="border-0 border-b"
            />
            <FormSelect
              name="timeFrame"
              label="Time Frame"
              value={formData.timeFrame}
              handleInputChange={handleInputChange}
              selectItems={timeFrameOptions}
              placeholder="Within 3 days"
              className="border-0 border-b"
            />
          </div>
          <div className="flex justify-between gap-4 ">
            <div className="flex items-center flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-start ml-0">
              {/*Form Image Input */}
              <button
                className="flex items-center gap-1 hover:text-gray-700"
                type="button"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">Photo</span>
              </button>
              {/*Form File Input */}
              <button
                className="flex items-center gap-1 hover:text-gray-700"
                type="button"
              >
                <Paperclip className="w-4 h-4" />
                <span className="text-xs">Attachment</span>
              </button>
            </div>
            <FormSubmitButton
              size="sm"
              submitting={false}
              text="Post"
              texting="Posting"
              className="px-4 md:px-8 text-sm md:text-sm"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
