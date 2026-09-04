import { Icon } from '@iconify/react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { currencyFormatter } from '@/utils/format'
import { useState } from 'react'
import FormInput from '../form-fields/FormInput'
import { useNegotiate } from '@/hooks/useChats'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function AgreementDialog({
  conversation_id,
  sendSocketMessage,
}: {
  conversation_id: string
  sendSocketMessage: (data: unknown) => boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    price: '',
    note: '',
  })
  const handleInputChange = (field: string, value: string) => {
    if (field === 'price') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({
        ...prev,
        [field]: newValue && `${currencyFormatter(Number(newValue))}`,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const { mutate: negotiate, isPending } = useNegotiate()

  const handleSendAcceptedPrice = () => {
    negotiate(
      {
        conversation_id,
        data: {
          price: formData.price,
          note: formData.note,
          status: 'accepted',
        },
      },
      {
        onSuccess: (createdMessage) => {
          sendSocketMessage({
            event: 'message',
            message_id: createdMessage.message_id,
          })
          setIsOpen(false)
        },
        onError: (error) => {
          toast.error(error.message)
          setIsOpen(true)
        },
      },
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className=" px-1  flex items-center gap-1 cursor-pointer  group text-start">
          <Icon
            strokeWidth={5}
            icon="mdi-light:check-circle"
            className="w-6.5 h-6.5 group-hover:text-primary shrink-0"
          />
          <span className="group-hover:text-primary">Agree on Final Price</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-60 px-2 py-4">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
            <Icon
              icon="material-symbols-light:money-bag-outline"
              className="w-6.5 h-6.5"
            />
            <span>Do you Agree on Final Price?</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Agree on Final price
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4">
          <FormInput
            name="price"
            value={formData.price}
            handleInputChange={handleInputChange}
            type="text"
            label="Final Price"
            className="bg-gray-300"
            placeholder="Enter a price"
            labelSize="text-xs md:text-sm"
          />
        </form>
        <AlertDialogFooter className="grid grid-cols-2">
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            No
          </AlertDialogCancel>
          <Button onClick={handleSendAcceptedPrice} disabled={isPending}>
            {isPending ? 'Please wait...' : 'Yes'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
