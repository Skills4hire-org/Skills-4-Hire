import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from '../ui/input'
import { Check, ImageIcon, Plus, VideoIcon } from 'lucide-react'
import { Button } from '../ui/button'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Label } from '../ui/label'
import { toast } from 'sonner'

export default function GalleryForm({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<{
    photos: string[]
    videos: string[]
  }>({
    photos: [],
    videos: [],
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedImageFiles: string[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const isOverSize = newFile.size > MAX_SIZE_MB
      if (isOverSize) {
        toast.warning(`${newFile.name}'s size exceeds 2MB`)
        return
      }
      const validImage = URL.createObjectURL(newFile)
      acceptedImageFiles.push(validImage)
    })
    setFormData({ ...formData, photos: acceptedImageFiles })
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedImageFiles: string[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const isOverSize = newFile.size > MAX_SIZE_MB
      if (isOverSize) {
        toast.warning(`${newFile.name}'s size exceeds 2MB`)
        return
      }
      const validImage = URL.createObjectURL(newFile)
      acceptedImageFiles.push(validImage)
    })
    setFormData({ ...formData, photos: acceptedImageFiles })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
    } catch (error: any) {}
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      <div className="flex items-center gap-3">
        <Label
          htmlFor="photo"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer pt-2"
        >
          <Input
            id="photo"
            name="photo"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Image</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
            {formData.photos.length !== 0 ? (
              <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
        <Label
          htmlFor="photo"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer pt-2"
        >
          <Input
            id="video"
            name="video"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            onChange={(e) => handleVideoChange(e)}
            className="hidden"
          />
          <VideoIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Video</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
            {formData.photos.length !== 0 ? (
              <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
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
          texting="uploading"
          text="upload"
          submitting={false}
          disabled={!formData.photos}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
