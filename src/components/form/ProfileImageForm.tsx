import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'

export default function ProfileImageForm({
  avatar,
}: {
  avatar: string | undefined
}) {
  const [formData, setFormData] = useState({
    image: '',
  })
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFile = e.target.files
    if (!selectedFile) return
    const isOverSize = selectedFile[0].size > MAX_SIZE_MB
    if (isOverSize) {
      toast.warning('The image exceeds 2MB')
      return
    }
    const validImage = URL.createObjectURL(selectedFile[0])
    setFormData({ image: validImage })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <figure className="bg-gray-100 w-max mx-auto rounded-full mb-4">
        <img
          src={formData.image || avatar}
          alt="profile image"
          className="aspect-square object-cover w-30 md:w-40 rounded-full"
        />
      </figure>

      <div className="flex items-center justify-between mt-4">
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
        <Button type="submit" className="bg-green-600">
          Save
        </Button>
      </div>
    </form>
  )
}
