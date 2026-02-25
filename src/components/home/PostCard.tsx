import type { PostCard } from '@/utils/types'
import {
  Heart,
  MessageCircle,
  BarChart2,
  Star,
  MapPin,
  Dot,
  Repeat,
  MoreHorizontal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileImage from '@/components/global/ProfileImage'
import CommentForm from '../form/CommentForm'
import { useState } from 'react'
import CommentCard from '../global/CommentCard'

export default function PostCard({
  id,
  name,
  location,
  service,
  rating,
  reviews,
  tags = [],
  description,
  stats,
  comments,
  recommended,
}: PostCard) {
  const likeCount = stats?.likes ?? 0
  const commentCount = stats?.comments ?? 0
  const shareCount = stats?.shares ?? 0
  const impressionsCount = stats?.impressions ?? 0

  const [showComment, setShowComment] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow p-3 md:p-4 space-y-2.5 md:space-y-3">
      {recommended && (
        <div className="text-sm md:text-base border-b pb-2 flex items-center gap-1.5">
          <ProfileImage size="size-6" noStatus />
          <p>
            <span className="font-semibold">Joshua Friday</span> recommended
            this
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2 md:gap-3">
          <Link to={`/customer/service-provider/${id}`}>
            <ProfileImage noStatus />
          </Link>

          <div className="min-w-0">
            {name && (
              <div className="flex items-start">
                <Link
                  to={`/customer/service-provider/${id}`}
                  className="no-underline hover:no-underline"
                >
                  <h3 className="text-[15px] md:text-base  font-semibold text-gray-900 leading-tight">
                    {name}
                  </h3>
                </Link>
                <Dot className="w-8.5 h-8.5 -m-1.5" />
                <button className="capitalize font-semibold text-primary text-sm md:text-base">
                  endorse
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500 my-0.5">
              {location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="md:w-[14px]" /> {location}
                </span>
              )}
              {rating && (
                <span className="inline-flex items-center gap-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{rating}</span>
                  {reviews && (
                    <span className="text-gray-500">({reviews} reviews)</span>
                  )}
                </span>
              )}
            </div>

            {service && (
              <Link
                to={`/customer/service-provider/${id}`}
                className="text-[12px] md:text-sm text-primary font-medium no-underline hover:no-underline block"
              >
                {service}
              </Link>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-gray-600 text-[14px] md:text-base leading-snug md:leading-relaxed">
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-200 text-gray-500">
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer">
          <Heart className="w-4 h-4 md:h-5 md:w-5" /> <span>{likeCount}</span>
        </button>

        <button
          className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer"
          onClick={() => setShowComment(true)}
        >
          <MessageCircle className="w-4 h-4 md:h-5 md:w-5" />
          <span>{commentCount}</span>
        </button>
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer">
          <Repeat className="w-4 h-4 md:h-5 md:w-5" /> <span>{shareCount}</span>
        </button>
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer">
          <BarChart2 className="w-4 h-4 md:h-5 md:w-5" />
          <span>{impressionsCount}</span>
        </button>
      </div>
      {showComment && (
        <div className="mt-6 space-y-4">
          <CommentForm />

          <div className="grid gap-6">
            {/* Comment Content */}
            {comments?.slice(0, 2).map((singleComment, index) => (
              <CommentCard key={index} {...singleComment} />
            ))}
          </div>
          {comments && comments?.length > 2 && (
            <div className="flex items-center gap-1">
              <div className="p-1 bg-gray-100 w-max rounded-full">
                <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <button className="text-[10px] md:text-xs font-medium cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
                Load more comments
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
