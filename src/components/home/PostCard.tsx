import type { PostCard } from '@/utils/types'
import {
  Heart,
  MessageCircle,
  Share2,
  BarChart2,
  Star,
  MapPin,
} from 'lucide-react'

export default function PostCard({
  profile,
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
    <div className="bg-white rounded-2xl shadow p-2.5 md:p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {profile && (
            <img
              src={profile}
              alt={name ?? 'profile'}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} /> {location}
                </span>
              )}
              {rating && (
                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{rating}</span>
                  {reviews && (
                    <span className="text-gray-500">({reviews} reviews)</span>
                  )}
                </span>
              )}
            </div>
            {service && (
              <p className="text-xs text-blue-600 font-medium">{service}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-around md:justify-between pt-2 border-t border-gray-200 text-gray-500 gap-6 md:gap-6">
        <button className="flex items-center gap-1 text-sm hover:text-blue-600">
          <Heart size={18} /> <span className="text-sm">{likeCount}</span>
        </button>

        <button className="flex items-center gap-1 text-sm hover:text-blue-600">
          <MessageCircle size={18} />{' '}
          <span className="text-sm">{commentCount}</span>
        </button>

        <button className="flex items-center gap-1 text-sm hover:text-blue-600">
          <Share2 size={18} /> <span className="text-sm">{shareCount}</span>
        </button>

        <button className="flex items-center gap-1 text-sm hover:text-blue-600">
          <BarChart2 size={18} />{' '}
          <span className="text-sm">{impressionsCount}</span>
        </button>
      </div>
    </div>
  )
}
