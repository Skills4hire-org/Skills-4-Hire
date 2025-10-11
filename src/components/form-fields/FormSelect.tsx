import type { SelectItems } from '@/utils/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface FormSelectFieldProp {
  name: string
  label?: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder: string
  required?: boolean
  selectItems: SelectItems[]
  className?: string
}

export default function FormSelect({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  selectItems,
  required,
  className,
}: FormSelectFieldProp) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-xs md:text-sm">
          {label}
        </Label>
      )}

      <Select
        value={value}
        onValueChange={(value) => handleInputChange(name, value)}
        required={required}
        name={name}
      >
        <SelectTrigger
          className={`w-full relative ${className} text-sm md:text-base pl-4 [&>svg]:hidden sm:[&>svg]:block`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ value, label }, index) => (
            <SelectItem key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
