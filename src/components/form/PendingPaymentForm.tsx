import { currencyFormatter } from '@/utils/format'
import { Star } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { useGiveReview } from '@/hooks/useReviews'
import { toast } from 'sonner'
import { useApproveBookingPayment } from '@/hooks/useBookings'
import { useNavigate } from 'react-router-dom'

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
  const [isReviewSent, setIsReviewSent] = useState(false)
  const [canApprove, setCanApprove] = useState(false)
  const { mutate: giveReview, isPending: reviewSending } = useGiveReview()
  const { mutate: approve, isPending: approveSending } =
    useApproveBookingPayment()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    giveReview(
      {
        provider_id,
        reviews: formData.review,
        ratings: formData.rating,
      },
      {
        onSuccess: () => {
          return (
            toast.success('Review sent'),
            setIsReviewSent(true),
            setCanApprove(true)
          )
        },
        onError: (error) => {
          if (error.message == 'review found for this user') {
            toast.warning('You have sent a review already.')
            return (setIsReviewSent(true), setCanApprove(true))
          }
          toast.error(error?.message)
        },
      },
    )
  }
  const navigate = useNavigate()
  const price = (0.92 * amount).toFixed(2).toString()

  const handleApprovePayment = () => {
    approve(
      {
        id: booking_id,
        amount: price,
      },
      {
        onSuccess: () => {
          toast.success('Payment approved!')
          navigate('/customer/bookings')
        },
        onError: (error) => {
          toast.error(error?.message)
        },
      },
    )
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
          disabled={isReviewSent}
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
              disabled={isReviewSent}
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
      <div className="flex justify-center mt-8 md:mt-10 mb-10 gap-2 md:gap-4">
        <Button
          size="lg"
          variant="outline"
          type="submit"
          disabled={reviewSending || isReviewSent}
          className="px-10 py-4 rounded-xl text-base font-semibold"
        >
          {reviewSending ? 'Sending...' : 'Send Review'}
        </Button>
        <Button
          size="lg"
          type="button"
          disabled={approveSending || !canApprove}
          onClick={handleApprovePayment}
          className="px-10 py-4 rounded-xl text-base font-semibold"
        >
          {approveSending ? 'Approving...' : 'Approve'}
        </Button>
      </div>
    </form>
  )
}
