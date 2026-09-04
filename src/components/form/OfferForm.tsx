import { useRef, useState, type FormEvent } from 'react'
import FormSubmitButton from '../buttons/FormSubmitButton'
import FormInput from '../form-fields/FormInput'
import FormTextArea from '../form-fields/FormTextArea'
import FormSelect from '../form-fields/FormSelect'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, ImageIcon, Paperclip, Plus } from 'lucide-react'
import { timeFrameOptions } from '@/assets/data'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { useServiceCategories } from '@/hooks/useServices'
import { toast } from 'sonner'
import { createOfferSchema } from '@/utils/schemas'
import type { CreatePost, OfferFormType, Post } from '@/types/post.types'
import ImageEditor from '../global/ImageEditor'
import { uploadToCloudinary } from '@/utils/cloudinary'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { vocationalCategories, digitalCategories } from '@/data/staticServices'

export default function OfferForm({
  offer,
  onSubmit,
  isSubmitting,
  setIsSubmitting,
}: {
  offer?: Post
  onSubmit: (data: CreatePost) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}) {
  const { data: serviceCategories = [], isLoading: areCategoriesLoading } =
    useServiceCategories()

  // Each item: { main_service_id, name, category: { name, service_category_id } }
  // Value sent to backend = main_service_id (UUID)
  // Group by category.name, then sort into vocational / digital by matching
  // category.name against our static lists

  const vocationalCategoryNames = new Set(
    vocationalCategories.map((c) => c.name.toLowerCase()),
  )
  const digitalCategoryNames = new Set(
    digitalCategories.map((c) => c.name.toLowerCase()),
  )

  type ApiItem = { main_service_id: string; name: string; category?: { name?: string; service_category_id?: string } }

  const vocationalOptions: { value: string; label: string }[] = []
  const digitalOptions: { value: string; label: string }[] = []
  const otherOptions: { value: string; label: string }[] = []
  const seenIds = new Set<string>()

  ;(serviceCategories as unknown as ApiItem[]).forEach((item) => {
    const categoryId = item.category?.service_category_id
    if (!categoryId || seenIds.has(categoryId)) return
    seenIds.add(categoryId)
    const option = { value: categoryId, label: item.category?.name ?? item.name }
    const catName = item.category?.name?.toLowerCase() ?? ''
    if (vocationalCategoryNames.has(catName)) vocationalOptions.push(option)
    else if (digitalCategoryNames.has(catName)) digitalOptions.push(option)
    else otherOptions.push(option)
  })

  const [formData, setFormData] = useState<OfferFormType>({
    title: offer?.post_title ?? '',
    post: offer?.post_content ?? '',
    budget: offer?.amount ?? '',
    timeFrame: offer?.duration?.toString() ?? undefined,
    service: offer?.tags?.[0]?.name ?? undefined,
    photo: [],
    attachment: [],
    city: offer?.city ?? '',
    state: offer?.state ?? '',
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
  const editQueueRef = useRef<File[]>([])
  const [editingSrc, setEditingSrc] = useState<string | null>(null)
  const [editingFile, setEditingFile] = useState<File | null>(null)

  const openNextEditor = () => {
    const next = editQueueRef.current.shift()
    if (!next) {
      setEditingSrc(null)
      setEditingFile(null)
      return
    }
    setEditingFile(next)
    setEditingSrc(URL.createObjectURL(next))
  }

  const handleEditConfirm = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      photo: [...prev.photo, file],
    }))
    openNextEditor()
  }

  const handleEditCancel = () => {
    openNextEditor()
  }

  const handleFileChange = (field: string, file: any) => {
    const selectedFiles = file || []
    const files: File[] = Array.from(selectedFiles)
    const acceptedImageFiles: File[] = []
    if (files.length === 0) return

    files.forEach((newFile) => {
      const isImage = newFile.type.startsWith('image/')
      const isDocument = newFile.type.endsWith('document')
      const isPdf = newFile.type.endsWith('pdf')

      if (field == 'photo' && !isImage && fileRef.current) {
        fileRef.current.value = ''
        return toast.warning('File type is not acceptable.')
      }
      if (field == 'attachment' && (!isDocument || !isPdf) && fileRef.current) {
        fileRef.current.value = ''
        return toast.warning('File type is not acceptable.')
      }
      acceptedImageFiles.push(newFile)
    })
    if (fileRef.current) {
      fileRef.current.value = ''
    }
    if (acceptedImageFiles.length === 0) return

    if (field === 'photo') {
      editQueueRef.current.push(...acceptedImageFiles)
      if (!editingSrc) {
        openNextEditor()
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: acceptedImageFiles }))
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validatedData = useValidateSchema(createOfferSchema, formData)
    if (!validatedData) {
      return
    }

    setIsSubmitting(true)
    try {
      let attachments: CreatePost['attachments'] = []
      if (formData.photo.length !== 0) {
        const uploadedPhotos = await uploadToCloudinary(formData.photo)
        attachments = uploadedPhotos?.map((url) => ({
          public_id: url.public_id,
          attachment_type: 'PHOTO',
          attachmentURL: url.url,
        }))
      }
      const allData: CreatePost = {
        city: validatedData.city,
        state: validatedData.state,
        post_title: validatedData.title,
        post_content: validatedData.post,
        post_type: 'JOB',
        amount: validatedData.budget,
        duration: Number(validatedData.timeFrame),
        tags: [validatedData.service],
        attachments,
      }
      onSubmit(allData)
    } catch (error: any) {
      setIsSubmitting(false)
      toast.error('Uploading of photos failed. Please try again')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <FormInput
        name="title"
        placeholder="What job do you want to get done?"
        label="Title"
        required
        value={formData.title}
        type="text"
        handleInputChange={handleInputChange}
        className="h-9 text-sm md:text-base"
        labelSize="text-xs md:text-sm"
        maxLength={50}
      />
      <FormTextArea
        name="post"
        placeholder="Briefly describe the job"
        label="Description"
        value={formData.post}
        handleInputChange={handleInputChange}
        className="text-sm md:text-base p-2 py-2 md:py-4 h-66 min-h-[48px]"
        rows={3}
        required
      />

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
            className="border-0 border-b h-9 text-sm md:text-base"
            labelSize="text-xs md:text-sm"
          />
          <FormSelect
            name="timeFrame"
            label="Time Frame"
            value={formData.timeFrame}
            handleInputChange={handleInputChange}
            selectItems={timeFrameOptions}
            placeholder="Select"
            className="border-0 border-b h-9 [&_svg]:block pl-3 text-sm md:text-base"
            labelSize="text-xs md:text-sm"
            required
          />
        </div>
        <div className="grid">
          <div className="space-y-1.5">
            <Label htmlFor="service" className="text-xs md:text-sm font-medium">
              Type of Service
            </Label>
            <Select
              value={formData.service}
              onValueChange={(value) => handleInputChange('service', value)}
              name="service"
              required
              disabled={areCategoriesLoading}
            >
              <SelectTrigger className="border-0 border-b h-9 pl-3 text-sm md:text-base w-full">
                <SelectValue placeholder={areCategoriesLoading ? 'Loading...' : 'Select'} />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {vocationalOptions.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="text-xs font-bold text-primary uppercase tracking-wide px-2 py-1.5">
                      Vocational & On-Site
                    </SelectLabel>
                    {vocationalOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {digitalOptions.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="text-xs font-bold text-primary uppercase tracking-wide px-2 py-1.5 mt-1">
                      Digital Skills
                    </SelectLabel>
                    {digitalOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {otherOptions.length > 0 && (
                  <SelectGroup>
                    <SelectLabel className="text-xs font-bold text-primary uppercase tracking-wide px-2 py-1.5 mt-1">
                      Other
                    </SelectLabel>
                    {otherOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-xs md:text-sm block font-medium">Location</span>
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <FormInput
              name="city"
              placeholder="Enter city"
              required
              value={formData.city}
              type="text"
              handleInputChange={handleInputChange}
              className="border-0 border-b h-9 text-sm md:text-base"
            />
            <FormInput
              name="state"
              placeholder="Enter state"
              required
              value={formData.state}
              type="text"
              handleInputChange={handleInputChange}
              className="border-0 border-b h-9 text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-start ml-0 mt-6 md:mt-8">
        <Label
          htmlFor="photo"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
        >
          <Input
            id="photo"
            name="photo"
            type="file"
            multiple
            ref={fileRef}
            accept="image/png, image/jpeg"
            onChange={(e) => handleFileChange('photo', e.target.files)}
            className="hidden"
          />
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Photo</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1 min-w-5 min-h-5 flex items-center justify-center text-xs leading-none">
            {formData.photo.length !== 0 ? (
              formData.photo.length
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
            multiple
            ref={fileRef}
            accept=".pdf, .doc, .docx"
            onChange={(e) => handleFileChange('attachment', e.target.files)}
            className="hidden"
          />
          <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Attachment</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
            {formData.attachment.length !== 0 ? (
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
          submitting={isSubmitting}
          text="Post offer"
          texting="Posting"
          className="px-4 md:px-8 text-sm md:text-base"
        />
      </div>
      <ImageEditor
        open={!!editingSrc}
        imageSrc={editingSrc ?? ''}
        originalFile={editingFile}
        aspect={4 / 5}
        outputWidth={1024}
        outputHeight={1280}
        fileName={editingFile?.name}
        onCancel={handleEditCancel}
        onConfirm={handleEditConfirm}
      />
    </form>
  )
}
