import { useState } from 'react'
import ProfileImage from './ProfileImage'
import { Heart, MessageCircle, Reply } from 'lucide-react'
import CommentReplyForm from '../form/CommentReplyForm'

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
    <div className="space-y-2">
      <div className="flex items-center gap-2 md:gap-3">
        <ProfileImage noStatus size="size-8 md:size-10" />
        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
            {name}
          </h3>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            2 hours ago
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm md:text-base leading-snug md:leading-relaxed">
        {text}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 md:gap-10 pt-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm font-medium transition-all cursor-pointer   rounded-full ${
            liked ? 'text-red-600' : 'text-gray-600 hover:text-primary'
          }`}
        >
          <Heart
            className="w-4 h-4 md:h-5 md:w-5"
            fill={liked ? 'currentColor' : 'none'}
          />
          <span className="text-xs md:text-sm text-muted-foreground">
            {likes}
          </span>
        </button>

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary rounded-full transition-all cursor-pointer"
        >
          <Reply className="w-4 h-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Reply</span>
        </button>

        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary  rounded-full transition-all cursor-pointer">
          <MessageCircle className="w-4 h-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">{replies} replies</span>
        </button>
      </div>

      {/* Reply Input */}
      {showReplyForm && (
        <CommentReplyForm setShowReplyForm={setShowReplyForm} />
      )}
    </div>
  )
}
