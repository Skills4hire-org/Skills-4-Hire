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
import FormTextArea from '../form-fields/FormTextArea'
import { useNegotiate } from '@/hooks/useChats'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function ProposePriceDialog({
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
        [field]: newValue,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const { mutate: negotiate, isPending } = useNegotiate()

  const handleSendProposedPrice = () => {
    negotiate(
      {
        conversation_id,
        data: {
          price: formData.price,
          note: formData.note,
          status: 'proposed',
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
        <button className="border-r-1 border-foreground px-1  flex items-center gap-1 cursor-pointer hover:text-primary text-start">
          <Icon
            icon="material-symbols-light:money-bag-outline"
            className="w-6.5 h-6.5 shrink-0"
          />
          <span>Propose Price</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-60 px-2 py-4">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
            <Icon
              icon="material-symbols-light:money-bag-outline"
              className="w-6.5 h-6.5 "
            />
            <span>Propose Price</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Propose a price
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4">
          <FormInput
            name="price"
            value={currencyFormatter(Number(formData.price))}
            handleInputChange={handleInputChange}
            type="text"
            label="Price"
            className="bg-gray-300"
            placeholder="Enter a price"
            labelSize="text-xs md:text-sm"
          />
          <FormTextArea
            name="note"
            value={formData.note}
            handleInputChange={handleInputChange}
            label="Note (Optional)"
            rows={1}
            className="bg-gray-300 mt-2 min-h-8  h-9 md:h-10 text-xs md:text-sm"
          />
        </form>
        <AlertDialogFooter className="grid grid-cols-2">
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleSendProposedPrice} disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
