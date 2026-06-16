import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useUpdateCoverPhoto } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/utils/cloudinary'

export default function CoverPhotoForm({
  cover_photo,
}: {
  cover_photo: string | undefined
}) {
  const [formData, setFormData] = useState<{
    image: string
    image_file: File[]
  }>({
    image: '',
    image_file: [],
  })
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files = Array.from(selectedFiles)
    if (files.length === 0) return
    const isOverSize = files[0].size > MAX_SIZE_MB
    if (isOverSize) {
      toast.warning('Image size exceeds 2MB')
      return
    }
    const validImage = URL.createObjectURL(files[0])
    setFormData({ image: validImage, image_file: files })
  }
  const { mutate: updateCoverPhoto, isPending } = useUpdateCoverPhoto()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const uploadedUrls = await uploadToCloudinary(formData.image_file)
      if (uploadedUrls) {
        const data = {
          data: {
            image_url: uploadedUrls[0].url,
            public_url: uploadedUrls[0]?.public_id,
          },
        }
        updateCoverPhoto(data, {
          onSuccess: () => {
            toast.success('Cover photo saved')
          },
        })
      }
    } catch (error) {
      toast.error('Failed to upload cover photo')
    }
  }
  const image = formData.image || cover_photo

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`w-full bg-cover bg-center h-[20vh] md:h-[25vh] shadow-md bg-gray-100`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="flex items-center justify-between mt-6">
        <Label
          htmlFor="image"
          className="h-9 px-4 py-2
                    bg-primary
                    rounded-md text-white cursor-pointer"
        >
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="hidden"
          />
          Edit Image
        </Label>
        <Button
          type="submit"
          className="bg-green-600"
          disabled={isPending || !formData.image_file}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
