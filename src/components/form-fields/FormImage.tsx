import type { ChangeEvent } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FaCamera } from 'react-icons/fa'

interface FormImageProp {
  name: string
  className?: string
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FormImage({
  name,
  className,
  handleImageChange,
}: FormImageProp) {
  return (
    <Label
      htmlFor={name}
      className={`${className}
      `}
    >
      <Input
        id={name}
        name={name}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="hidden"
      />
      <FaCamera className="w-8 h-8 fill-gray-400" />
    </Label>
  )
}
