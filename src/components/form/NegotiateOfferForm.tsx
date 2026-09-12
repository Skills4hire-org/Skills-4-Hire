import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { RefreshCw, X } from 'lucide-react'
import FormTextArea from '../form-fields/FormTextArea'
import { useCreateConversation, useCreateMessage } from '@/hooks/useChats'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { currencyFormatter } from '@/utils/format'

interface NegotiateOfferFormProps {
  setIsNegotiateOpen: (value: boolean) => void
  customerUserId?: string
  postTitle?: string
}

export default function NegotiateOfferForm({
  setIsNegotiateOpen,
  customerUserId,
  postTitle,
}: NegotiateOfferFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { mutate: createConversation } = useCreateConversation()
  const { mutateAsync: createMessage } = useCreateMessage()

  const handleInputChange = (field: string, value: string) => {
    if (field === 'amount') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!customerUserId)
      return toast.error('This request is missing customer details.')
    if (!formData.amount)
      return toast.error('Enter a proposed amount to negotiate.')

    setIsSubmitting(true)

    const proposal =
      `I'd like to negotiate the offer${postTitle ? ` for "${postTitle}"` : ''}.\n` +
      `Proposed amount: ${currencyFormatter(Number(formData.amount))}.` +
      (formData.reason ? `\n\nReason: ${formData.reason}` : '')

    createConversation(
      { participant_two_id: customerUserId },
      {
        onSuccess: (conversation) => {
          const conversationId = conversation?.conversation_id
          if (!conversationId) {
            setIsSubmitting(false)
            return toast.error('Unable to open a conversation for this request.')
          }
          createMessage({ conversation_id: conversationId, data: { content: proposal } })
            .then(() => {
              toast.success('Proposal sent to the customer.')
              setIsNegotiateOpen(false)
              navigate(`/professional/messages/${conversationId}`)
            })
            .catch(() => {
              setIsSubmitting(false)
              toast.error('Unable to send your proposal. Please try again.')
            })
        },
        onError: () => {
          setIsSubmitting(false)
        },
      },
    )
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">Negotiate Offer</h2>

      <p className="text-sm text-gray-600">
        Enter your proposed amount and reason for negotiation.
      </p>
      <FormInput
        name="amount"
        placeholder="Enter amount"
        label="Proposed Amount"
        required
        value={formData.amount}
        type="text"
        handleInputChange={handleInputChange}
        className="h-9 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
        labelSize="text-xs md:text-sm"
      />
      <FormTextArea
        name="reason"
        placeholder="Explain why you're negotiating..."
        label="Reason (Optional)"
        value={formData.reason}
        handleInputChange={handleInputChange}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm md:text-base resize-none "
        rows={3}
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => setIsNegotiateOpen(false)}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 cursor-pointer disabled:opacity-60"
        >
          <X size={16} /> Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-yellow-400 text-white text-sm hover:opacity-90 cursor-pointer disabled:opacity-60"
        >
          <RefreshCw size={16} />
          {isSubmitting ? 'Please wait...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}