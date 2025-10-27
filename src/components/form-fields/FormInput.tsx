import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FormInputFieldProp {
  name: string
  label?: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder?: string
  type: string
  min?: string
  required?: boolean
  disabled?: boolean
  className?: string
  handleBlur?: () => void
}

export default function FormInput({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  type,
  min,
  required,
  disabled,
  className,
  handleBlur,
}: FormInputFieldProp) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className="text-xs md:text-sm">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        required={required}
        disabled={disabled}
        className={`${className} text-sm md:text-base`}
        onBlur={handleBlur}
        autoComplete="true"
      />
    </div>
  )
}
