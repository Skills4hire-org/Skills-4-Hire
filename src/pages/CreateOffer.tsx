import { services, timeFrameOptions } from '@/assets/data'
import FormSubmitButton from '@/components/buttons/FormSubmitButton'
import FormInput from '@/components/form-fields/FormInput'
import FormSelect from '@/components/form-fields/FormSelect'
import FormTextArea from '@/components/form-fields/FormTextArea'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserType } from '@/utils/types'
import { Check, ImageIcon, Paperclip, Plus } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function CreateOffer() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const [formData, setFormData] = useState({
    post: '',
    budget: '',
    timeFrame: undefined,
    service: undefined,
    photo: '',
    attachment: '',
    city: '',
    state: '',
  })

  const handleInputChange = (field: string, value: string) => {
    if (field === 'budget') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (
    field: string,
    file: FileList | null,
    types: string[],
  ) => {
    if (!file) {
      return
    }
    if (!types.includes(file[0].type) && fileRef.current) {
      fileRef.current.value = ''
      return toast('File type is not acceptable.')
    }
    setFormData({ ...formData, [field]: file })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Create An Offer" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileImage noStatus size="size-12 md:size-16" />

            <p className="text-xl md:text-2xl font-medium">Joshua Friday</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <FormTextArea
              name="post"
              placeholder={
                userType == 'customer'
                  ? 'What job do you want to get done?'
                  : 'Post about your latest work or service.'
              }
              value={formData.post}
              handleInputChange={handleInputChange}
              className="text-sm md:text-base p-2 py-4 h-66 min-h-[48px]"
              rows={3}
              required
            />
            {userType == 'customer' && (
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 gap-4 md:gap-10">
                  <FormInput
                    name="budget"
                    placeholder="Enter an amount"
                    label="Budget Amount (₦)"
                    required
                    value={formData.budget}
                    type="text"
                    handleInputChange={handleInputChange}
                    className="border-0 border-b h-9"
                    labelSize="text-xs md:text-sm"
                  />
                  <FormSelect
                    name="timeFrame"
                    label="Time Frame"
                    value={formData.timeFrame}
                    handleInputChange={handleInputChange}
                    selectItems={timeFrameOptions}
                    placeholder="Select"
                    className="border-0 border-b h-9 [&_svg]:block pl-3"
                    labelSize="text-xs md:text-sm"
                    required
                  />
                </div>
                <div className="grid">
                  <FormSelect
                    name="service"
                    label="Type of Service"
                    value={formData.service}
                    handleInputChange={handleInputChange}
                    selectItems={services}
                    placeholder="Select"
                    className="border-0 border-b h-9 [&_svg]:block pl-3"
                    labelSize="text-xs md:text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs md:text-sm block font-medium">
                    Location
                  </span>
                  <div className="grid grid-cols-2 gap-4 md:gap-10">
                    <FormInput
                      name="city"
                      placeholder="Enter city"
                      required
                      value={formData.city}
                      type="text"
                      handleInputChange={handleInputChange}
                      className="border-0 border-b h-9"
                    />
                    <FormInput
                      name="state"
                      placeholder="Enter state"
                      required
                      value={formData.state}
                      type="text"
                      handleInputChange={handleInputChange}
                      className="border-0 border-b h-9"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-start ml-0 mt-6 md:mt-8">
              <Label
                htmlFor="photo"
                className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
              >
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  ref={fileRef}
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    handleFileChange('photo', e.target.files, [
                      'image/png',
                      'image/jpeg',
                    ])
                  }
                  className="hidden"
                />
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Photo</span>
                <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-1.5">
                  {formData.photo ? (
                    <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </span>
              </Label>

              <Label
                htmlFor="attachment"
                className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
              >
                <Input
                  id="attachment"
                  name="attachment"
                  type="file"
                  ref={fileRef}
                  accept=".pdf, .doc, .docx"
                  onChange={(e) =>
                    handleFileChange('attachment', e.target.files, [
                      '.pdf',
                      '.doc',
                      '.docx',
                    ])
                  }
                  className="hidden"
                />
                <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Attachment</span>
                <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-1.5">
                  {formData.attachment ? (
                    <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </span>
              </Label>
            </div>
            <div className="border-t pt-2 md:pt-4 flex justify-end">
              <FormSubmitButton
                size="sm"
                submitting={false}
                text="Post offer"
                texting="Posting"
                className="px-4 md:px-8 text-sm md:text-base"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
