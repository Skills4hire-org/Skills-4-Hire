import { currencyFormatter } from '@/utils/format'
import { Star } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useApproveBookingPayment } from '@/hooks/useBookings'
import { useGiveReview } from '@/hooks/useReviews'

export default function PendingPaymentForm({
  from,
  to,
  amount,
  provider_id,
  booking_id,
}: {
  from: string | null | undefined
  to: string
  amount: number
  provider_id: string | undefined
  booking_id: string | undefined
}) {
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  })

  const { mutateAsync: approve, isPending: isApproving } =
    useApproveBookingPayment()
  const { mutateAsync: giveReview, isPending: isReviewing } = useGiveReview()

  const navigate = useNavigate()
  const price = (0.92 * amount).toFixed(2).toString()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await Promise.all([
        approve({
          id: booking_id,
          amount: price,
        }),
        giveReview({
          provider_id,
          reviews: formData.review,
          ratings: formData.rating,
        }),
      ])
      toast.success('Payment approved!')
      navigate('/customer/bookings')
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-sm text-gray-800 space-y-2 md:space-y-4"
    >
      <div className="flex items-center  border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">From:</span>
        <span> {from} </span>
      </div>
      <div className="flex items-center  border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">To:</span>
        <span className="text-base"> {to} </span>
      </div>
      <div className="flex items-center border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Amount:</span>
        <span className="text-base">{currencyFormatter(amount)} </span>
      </div>

      <div className="flex items-start border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Comment:</span>
        <textarea
          name="comment"
          id="comment"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="flex-1 resize-none focus:outline-0"
          disabled={isApproving || isReviewing}
          required
        />
      </div>
      <div className="flex items-center border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Rating:</span>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none cursor-pointer"
              disabled={isApproving || isReviewing}
            >
              <Star
                className={`w-6 h-6 ${
                  formData.rating >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-8 md:mt-10 mb-10 gap-2 md:gap-4">
        <Button
          size="lg"
          type="submit"
          disabled={isApproving || isReviewing}
          className="px-10 py-4 rounded-xl text-base font-semibold"
        >
          {isApproving || isReviewing ? 'Approving...' : 'Approve'}
        </Button>
      </div>
    </form>
  )
}
