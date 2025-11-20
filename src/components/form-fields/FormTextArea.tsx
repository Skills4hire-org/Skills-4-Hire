import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface FormTextAreaProp {
  name: string
  label?: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder?: string
  rows: number
  required?: boolean
  className?: string
}

export default function FormTextArea({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  rows,
  required,
  className,
}: FormTextAreaProp) {
  return (
    <div className="space-y-1 md:space-y-2 w-full">
      {label && (
        <Label htmlFor={name} className="text-xs md:text-sm">
          {label}{' '}
        </Label>
      )}

      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`${className} break-all`}
      />
    </div>
  )
}
