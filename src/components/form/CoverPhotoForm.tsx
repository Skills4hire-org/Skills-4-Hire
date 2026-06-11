import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useUpdateCoverPhoto } from '@/hooks/useUsers'
import { toast } from 'sonner'

export default function CoverPhotoForm({
  cover_photo,
}: {
  cover_photo: string | undefined
}) {
  const [formData, setFormData] = useState({
    image: '',
  })
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFile = e.target.files
    if (!selectedFile) return
    const isOverSize = selectedFile[0].size > MAX_SIZE_MB
    if (isOverSize) return
    const validImage = URL.createObjectURL(selectedFile[0])
    setFormData({ image: validImage })
  }
  const { mutate: updateCoverPhoto, isPending } = useUpdateCoverPhoto()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      data: {
        image_url: '',
        public_url: '',
      },
    }
    updateCoverPhoto(data, {
      onSuccess: () => {
        toast.success('Cover photo saved')
      },
    })
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
        <Button type="submit" className="bg-green-600" disabled={isPending}>
          Save
        </Button>
      </div>
    </form>
  )
}
