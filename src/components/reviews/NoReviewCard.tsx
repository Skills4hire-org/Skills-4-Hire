import { Star } from 'lucide-react'

export default function NoReviewCard() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 py-6">
      <Star className="w-10 h-10 text-gray-400 mb-2" />
      <p className="text-sm">No Reviews</p>
    </div>
  )
}
