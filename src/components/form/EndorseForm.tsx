import { useEndorse } from '@/hooks/useEndorse'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { endorseFormSchema } from '@/utils/schemas'
import { useState, type FormEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { toast } from 'sonner'

export default function EndorseForm({
  provider_pk,
  setOpen,
}: {
  provider_pk: string | undefined
  setOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState({
    message: '',
  })

  const { mutate: endorse, isPending } = useEndorse()
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validatedData = useValidateSchema(endorseFormSchema, formData)
    if (!validatedData) {
      return
    }
    endorse(
      { ...validatedData, provider: provider_pk },
      {
        onSuccess: () => {
          toast.success('Endorsed')
          setOpen(false)
        },
        onError: (error) => {
          toast.error(error.message)
          setOpen(true)
        },
      },
    )
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormTextArea
        name="message"
        label="Recommendation"
        handleInputChange={handleInputChange}
        value={formData.message}
        rows={3}
        required
      />
      <div className="ml-auto w-max">
        <FormSubmitButton
          text="Send"
          texting="Sending"
          submitting={isPending}
          className="w-20 md:w-30"
        />
      </div>
    </form>
  )
}
