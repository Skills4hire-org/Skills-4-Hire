import { useState } from 'react'
import {
  CalendarDays,
  Clock,
  MapPin,
  MessageSquare,
  RefreshCw,
  Wallet,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ProfileImage from '@/components/global/ProfileImage'
import ImageCarousel from '@/components/home/ImageCarousel'
import NegotiationDialog from '@/components/home/NegotiationDialog'
import { useCreateConversation } from '@/hooks/useChats'
import { Button } from '../ui/button'
import type { Post } from '@/types/post.types'
import { currencyFormatter, formatRelativeTime } from '@/utils/format'

interface RequestCardProp {
  post: Post
}

export default function RequestCard({ post }: RequestCardProp) {
  const [viewMore, setViewMore] = useState(false)
  const [isNegotiateOpen, setIsNegotiateOpen] = useState(false)
  const { mutate: createConversation, isPending: isOpeningConversation } =
    useCreateConversation()
  const navigate = useNavigate()
  const name =
    post.user?.profile?.display_name ||
    `${post.user?.first_name ?? ''} ${post.user?.last_name ?? ''}`.trim() ||
    'Customer'
  const avatar = post.user?.profile?.avatar?.avatar
  const status = post.post_status || 'Pending'
  const service = post.tags?.[0]?.name
  const price = Number(post.amount) || 0
  const address = [post.city, post.state].filter(Boolean).join(', ')
  const isRemote = post.is_remote
  const isLongContent = !!post.post_content && post.post_content.length > 200

  const isPending = status.toLowerCase() === 'pending'
  const statusColor = isPending ? 'bg-red-500' : 'bg-primary'

  const handleApply = () => {
    if (!post.user?.user_id)
      return toast.error('This request is missing customer details.')
    createConversation(
      { participant_two_id: post.user.user_id },
      {
        onSuccess: (conversation) => {
          const conversationId = conversation?.conversation_id
          if (!conversationId)
            return toast.error('Unable to open a conversation for this request.')
          navigate(`/professional/messages/${conversationId}`)
        },
      },
    )
  }

  return (
    <>
      {isNegotiateOpen && (
        <NegotiationDialog setIsNegotiateOpen={setIsNegotiateOpen} />
      )}

      <div className="shadow-md border border-gray-200 overflow-hidden">
      <div className="px-3 md:px-6 py-4 md:py-6 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <ProfileImage noStatus size="size-10 md:size-12" avatar={avatar} />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium text-gray-900 truncate">{name}</h3>
              <span
                className={`${statusColor} text-white text-xs px-3 py-1 rounded-full w-fit shrink-0`}
              >
                {status}
              </span>
            </div>

            {post.post_title && (
              <p className="font-semibold text-gray-900 leading-snug">
                {post.post_title}
              </p>
            )}
          </div>
        </div>

        {service && (
          <span className="w-fit text-xs md:text-sm bg-primary/10 text-primary rounded-sm px-3 py-1 font-medium">
            {service}
          </span>
        )}

        {post.post_content && (
          <div>
            <p
              className={`text-sm md:text-base text-gray-600 ${
                isLongContent && !viewMore ? 'line-clamp-2' : ''
              }`}
            >
              {post.post_content}
            </p>
            {isLongContent && (
              <button
                onClick={() => setViewMore(!viewMore)}
                className="text-xs md:text-sm text-primary underline cursor-pointer hover:no-underline"
              >
                {viewMore ? 'less' : 'more'}
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          {address && (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-green-50 text-green-700 whitespace-nowrap capitalize">
              <MapPin className="w-4 h-4 shrink-0" />
              {address}
            </span>
          )}

          {isRemote && (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-green-50 text-green-700 whitespace-nowrap">
              Remote
            </span>
          )}

          {post.duration ? (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-yellow-50 text-yellow-800 whitespace-nowrap">
              <Clock className="w-4 h-4 shrink-0" />
              {post.duration} day{post.duration > 1 ? 's' : ''}
            </span>
          ) : null}

          {price ? (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-blue-50 text-blue-700 whitespace-nowrap">
              <Wallet className="w-4 h-4 shrink-0" />
              {currencyFormatter(price)}
            </span>
          ) : null}
        </div>

        {post.attachments && post.attachments.length > 0 && (
          <div className="my-1">
            <ImageCarousel attachments={post.attachments} />
          </div>
        )}

        {post.created_at && (
          <p className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
            <CalendarDays className="w-3.5 h-3.5" />
            Posted {formatRelativeTime(post.created_at)}
          </p>
        )}

        <div className="flex gap-2 flex-nowrap mt-1">
          <Button
            onClick={() => setIsNegotiateOpen(true)}
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 bg-yellow-400 text-white rounded-md py-1 md:py-1.5 text-sm md:text-base hover:opacity-90"
          >
            <RefreshCw className="w-4 h-4" />
            Negotiate
          </Button>

          <Button
            onClick={handleApply}
            disabled={isOpeningConversation}
            variant="outline"
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 border-gray-200 text-gray-700 rounded-md py-1 md:py-1.5 text-sm md:text-base hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MessageSquare className="w-4 h-4" />
            {isOpeningConversation ? 'Opening…' : 'Apply'}
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
