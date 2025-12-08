import { useState } from 'react'
import ProfileImage from './ProfileImage'
import { Heart, MessageCircle, Reply } from 'lucide-react'

interface CommentCardProps {
  text: string
  likes: number
  replies: number
  name: string
}

export default function CommentCard({
  text,
  likes,
  replies,
  name,
}: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [liked, setLiked] = useState(false)
  /* const [showReplies, setShowReplies] = useState(false) */
  const handleLike = () => {
    setLiked(!liked)
  }
  return (
    <div className="space-y-2 md:space-y-4">
      <div className="flex items-center gap-3">
        <ProfileImage />
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-muted-foreground">2 hours ago</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm md:text-base leading-snug md:leading-relaxed">
        {text}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 md:gap-10 pt-2 md:pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm font-medium transition-all   rounded-full ${
            liked ? 'text-red-600' : 'text-gray-600 hover:text-primary'
          }`}
        >
          <Heart
            className="w-5 h-5 md:w-6 md:h-6"
            fill={liked ? 'currentColor' : 'none'}
          />
          <span className="text-xs md:text-sm text-muted-foreground">
            {likes}
          </span>
        </button>

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary rounded-full transition-all"
        >
          <Reply className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">Reply</span>
        </button>

        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary  rounded-full transition-all">
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">{replies} replies</span>
        </button>
      </div>

      {/* Reply Input */}
      {showReplyForm && (
        <div className=" py-2 md:py-4 border-y border-gray-100 ">
          <div className="flex gap-2 md:gap-4">
            <ProfileImage size="size-10" noStatus />
            <div className="flex-1">
              <textarea
                placeholder="Write a thoughtful reply..."
                className="w-full px-2 md:px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-2 md:mt-4">
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
