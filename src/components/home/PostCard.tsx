import type { PostCard } from '@/utils/types'
import {
  Heart,
  MessageCircle,
  Share2,
  BarChart2,
  Star,
  MapPin,
  Dot,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileImage from '@/components/global/ProfileImage'

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
}: PostCard) {
  const likeCount = stats?.likes ?? 0
  const commentCount = stats?.comments ?? 0
  const shareCount = stats?.shares ?? 0
  const impressionsCount = stats?.impressions ?? 0

  return (
    <div className="bg-white rounded-2xl shadow p-3 md:p-4 space-y-2.5 md:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2.5 md:gap-3">
          <Link to={`/customer/service-provider/${id}`}>
            <ProfileImage size="size-12 md:size-14" noStatus />
          </Link>

          <div className="min-w-0">
            {name && (
              <div className="flex items-center">
                <Link
                  to={`/customer/service-provider/${id}`}
                  className="no-underline hover:no-underline"
                >
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                    {name}
                  </h3>
                </Link>
                <Dot strokeWidth={4} className="w-5 h-5 -mx-0.5" />
                <button className="capitalize font-semibold text-primary text-sm md:text-base">
                  endorse
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500">
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
                className="text-xs md:text-sm text-blue-600 font-medium no-underline hover:no-underline"
              >
                {service}
              </Link>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-gray-600 text-sm md:text-base leading-snug md:leading-relaxed">
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-200 text-gray-500">
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <Heart className="w-5 h-5 md:w-6 md:h-6" /> <span>{likeCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />{' '}
          <span>{commentCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <Share2 className="w-5 h-5 md:w-6 md:h-6" /> <span>{shareCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <BarChart2 className="w-5 h-5 md:w-6 md:h-6" />
          <span>{impressionsCount}</span>
        </button>
      </div>
    </div>
  )
}
