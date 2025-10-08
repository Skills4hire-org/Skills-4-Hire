import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'

interface SubmitButtonProp {
  submitting: boolean
  text: string
  texting: string
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  className?: string
}

function FormSubmitButton({
  submitting,
  text,
  texting,
  size,
  className,
}: SubmitButtonProp) {
  return (
    <div>
      {submitting ? (
        <Button size={size} disabled className={className}>
          {texting} <Loader2Icon className="animate-spin " />
        </Button>
      ) : (
        <Button size={size} type="submit" className={className}>
          {text}
        </Button>
      )}
    </div>
  )
}
export default FormSubmitButton
