import { dateFormatter } from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import Ratings from '../global/Ratings'

interface ReviewCardProp {
  name: string
  createdAt: string | number | undefined
  role?: string
  image: string
  rating: number
  comment: string
}

export default function ReviewCard({
  name,
  createdAt,
  role,
  rating,
  comment,
}: ReviewCardProp) {
  return (
    <div className="bg-white rounded-md px-2 py-4 shadow ">
      <div className="flex items-center gap-2">
        <ProfileImage noStatus />
        <div className="flex flex-1 justify-between gap-6 items-center">
          <div>
            <h4 className="font-medium text-sm">{name}</h4>
            {role && (
              <span className="inline-block text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full mt-0.5">
                {role}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-gray-500">{dateFormatter(createdAt)}</p>
            <Ratings rating={rating} />
          </div>
        </div>
      </div>
      <p className="text-sm mt-2 text-gray-600 break-all">{comment}</p>
    </div>
  )
}
