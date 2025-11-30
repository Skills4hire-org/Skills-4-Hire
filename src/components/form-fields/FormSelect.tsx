import type { SelectItems } from '@/utils/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ChevronDownIcon } from 'lucide-react'

interface FormSelectFieldProp {
  name: string
  label?: string
  labelSize?: string
  value: string | undefined
  handleInputChange: (key: string, value: any) => void
  placeholder?: string
  required?: boolean
  selectItems: SelectItems[]
  className?: string
  disabled?: boolean
  handleBlur?: () => void
  align?: 'end' | 'center' | 'start'
  selectContentClassName?: string
  selectItemClassName?: string
  sideOffset?: number
  indicator?: boolean
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
  disabled,
  handleBlur,
  align,
  selectContentClassName,
  selectItemClassName,
  sideOffset,
  indicator,
  labelSize,
}: FormSelectFieldProp) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className={`text-sm md:text-base ${labelSize}`}>
          {label}
        </Label>
      )}

      <Select
        key={value === undefined ? 'undefined' : 'defined'}
        value={value}
        onValueChange={(value) => handleInputChange(name, value)}
        required={required}
        disabled={disabled}
        name={name}
        onOpenChange={handleBlur}
      >
        <SelectTrigger
          className={`w-full relative  text-sm md:text-base pl-4  ${className}`}
        >
          <SelectValue placeholder={placeholder}></SelectValue>
          {indicator && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              <ChevronDownIcon
                strokeWidth={3}
                className="w-5 h-5 text-foreground"
              />
            </span>
          )}
        </SelectTrigger>
        <SelectContent
          align={align}
          sideOffset={sideOffset}
          className={selectContentClassName}
        >
          {selectItems.map(({ value, label }, index) => (
            <SelectItem
              key={index}
              value={value}
              className={selectItemClassName}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
