import type { SelectItems } from '@/utils/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ChevronDownIcon } from 'lucide-react'

type SelectGroupData = {
  label: string
  options: {
    label: string
    options: SelectItems[]
  }[]
}

interface FormSelectFieldProp {
  name: string
  label?: string
  labelSize?: string
  value: string | undefined
  handleInputChange: (key: string, value: any) => void
  placeholder?: string
  required?: boolean
  selectGroupData: SelectGroupData[]
  className?: string
  disabled?: boolean
  handleBlur?: () => void
  align?: 'end' | 'center' | 'start'
  selectContentClassName?: string
  selectItemClassName?: string
  sideOffset?: number
  indicator?: boolean
}

export default function FormSelectGroup({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  selectGroupData,
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
          className={`w-full relative  text-sm md:text-base pl-4 cursor-pointer  ${className}`}
        >
          <SelectValue placeholder={placeholder} />
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
          {selectGroupData.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel className="capitalize text-lg">
                {group.label}
              </SelectLabel>
              {group.options.map((item) => (
                <SelectGroup key={item.label}>
                  <SelectLabel className="capitalize text-base ml-1">
                    {item.label}
                  </SelectLabel>
                  {item.options.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className={`${selectItemClassName} ml-2`}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
