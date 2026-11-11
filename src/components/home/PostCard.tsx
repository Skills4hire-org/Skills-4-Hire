import {
  Heart,
  MessageCircle,
  BarChart2,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  Send,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileImage from '@/components/global/ProfileImage'
import CommentForm from '../form/CommentForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useDeletePost,
  useLikePost,
  usePostImpression,
  useUnlikePost,
} from '@/hooks/usePosts'
import type { Post } from '@/types/post.types'
import type { UserData, UserType } from '@/types/user.types'
import type { RootState } from '@/store'
import ImageCarousel from './ImageCarousel'
import Comment from './Comment'
import { formatCommentTime } from '@/utils/format'
import Repost from './Repost'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useEffect, useRef } from 'react'
import { formatLinks } from '@/utils/linkify'
import ShareDialog from './ShareDialog'

export default function PostCard({
  post_id,
  user,
  post_content,
  created_at,
  tags,
  attachments,
  comments_count,
  likes_count,
  reposts_count,
  is_commented,
  is_liked,
  is_reposted,
  impression_count,
  queryKey,
}: Post & { queryKey: string[] }) {
  const [showComment, setShowComment] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const navigate = useNavigate()

  const {
    userType,
    user_data,
  }: {
    userType: UserType
    user_data: UserData | null
  } = useSelector((state: RootState) => state.userState)
  const provider_id = user?.profile?.provider_id
  const customer_id = user?.is_customer ? user.user_id : undefined
  const profilePath = customer_id
    ? `/${userType}/customers/${customer_id}`
    : provider_id
      ? `/${userType}/professionals/${provider_id}`
      : undefined
  const provider_service = user?.profile?.professional_title
  const provider_headline = user?.profile?.headline

  const isOwner = user_data?.user_id === user?.user_id

  const { mutate: likePost, isPending: liking } = useLikePost(queryKey)
  const { mutate: unlikePost, isPending: unliking } = useUnlikePost(queryKey)
  const { mutate: deletePost } = useDeletePost()
  const { mutate: sendImpression } = usePostImpression()

  const handleLikePost = () => {
    if (is_liked) {
      unlikePost({ post_id })
    } else {
      likePost({ post_id })
    }
  }

  const handleSharePost = async () => {
    if (!post_id) return

    const postUrl = new URL(window.location.href)
    postUrl.search = ''
    postUrl.searchParams.set('post', post_id)
    const url = postUrl.toString()
    const text = `Check out this post on Skills4Hire${post_content ? `: ${post_content.slice(0, 100)}` : ''}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Skills4Hire post',
          text,
          url,
        })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
      }
    }

    setShareUrl(url)
    setShowShareDialog(true)
  }

  const postRef = useRef<HTMLDivElement | null>(null)
  const hasViewed = useRef(false)

  useEffect(() => {
    const element = postRef.current

    if (!element || !post_id) return

    let timeout: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed.current) {
          timeout = setTimeout(() => {
            if (!hasViewed.current) {
              hasViewed.current = true

              sendImpression({
                post_id,
              })
            }
          }, 1000)
        } else {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
        }
      },
      {
        threshold: 0.5,
      },
    )

    observer.observe(element)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }

      observer.disconnect()
    }
  }, [post_id, sendImpression])

  const isTextLong = post_content && post_content.length > 200

  return (
    <div
      ref={postRef}
      id={post_id ? `post-${post_id}` : undefined}
      className="bg-white lg:rounded-2xl md:rounded-2xl md:shadow lg:shadow p-3 md:p-4 space-y-2.5 md:space-y-3 scroll-mt-20"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2 md:gap-3">
          {profilePath ? (
            <Link to={profilePath} aria-label={`View ${user?.profile?.display_name ?? 'user'} profile`}>
              <ProfileImage noStatus avatar={user?.profile?.avatar?.avatar} />
            </Link>
          ) : (
            <ProfileImage noStatus avatar={user?.profile?.avatar?.avatar} />
          )}

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              {profilePath ? (
                <Link to={profilePath} className="min-w-0 no-underline hover:no-underline">
                  <h3 className="truncate text-[15px] font-semibold leading-tight text-gray-900 md:text-base">
                    {user?.profile?.display_name}
                  </h3>
                </Link>
              ) : (
                <h3 className="truncate text-[15px] font-semibold leading-tight text-gray-900 md:text-base">
                  {user?.profile?.display_name}
                </h3>
              )}
              {!isOwner && provider_id && (
                <button
                  type="button"
                  disabled
                  title="Follow actions are not available until the follow API is enabled"
                  className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white opacity-60 disabled:cursor-not-allowed md:text-sm"
                >
                  + Follow
                </button>
              )}
            </div>
            {provider_headline && (
              <p className="line-clamp-1 text-xs text-gray-600 md:text-sm">
                {provider_headline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              {provider_service && (
                <span className="capitalize">
                  {provider_service.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              )}
              {provider_service && created_at && (
                <span aria-hidden="true">·</span>
              )}
              {created_at && (
                <span>{formatCommentTime(created_at)}</span>
              )}
            </div>
            {(user?.profile?.city || user?.profile?.state) && (
              <p className="inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                {[user?.profile?.city, user?.profile?.state]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
          </div>
        </div>
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Post options"
                className="cursor-pointer p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/${userType}/edit-post/${post_id}`)}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div>
        <p
          className={`text-gray-900 text-[14px] md:text-base leading-snug md:leading-relaxed whitespace-pre-line ${isTextLong && !viewMore ? 'line-clamp-2 sm:line-clamp-3 md:line-clamp-4' : ''}`}
        >
          {formatLinks(post_content ?? '')}
        </p>
        {isTextLong && (
          <button
            onClick={() => setViewMore(!viewMore)}
            className="text-[14px] md:text-base text-primary underline cursor-pointer hover:no-underline"
          >
            {viewMore ? 'less' : 'more'}
          </button>
        )}
      </div>
      {attachments?.length !== 0 && (
        <div className="my-8">
          <ImageCarousel attachments={attachments} />
        </div>
      )}

      {tags && tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags?.map((tag) => (
            <span
              key={tag.service_category_id}
              className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm bg-primary/10 text-primary rounded-full capitalize"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-200 text-gray-500">
        {/* like */}
        <button
          onClick={handleLikePost}
          disabled={liking || unliking}
          className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${is_liked && 'text-red-600'}`}
        >
          <Heart
            className={`w-5 h-5 md:h-6 md:w-6 ${is_liked && 'fill-red-600'}`}
          />
          <span>{likes_count}</span>
        </button>
        {/* comment */}
        <button
          className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${is_commented && 'text-blue-600'}`}
          onClick={() => setShowComment(true)}
        >
          <MessageCircle className="w-5 h-5 md:h-6 md:w-6" />
          <span>{comments_count}</span>
        </button>

        {/* repost */}
        <div>
          <Repost
            post_id={post_id}
            reposts_count={reposts_count}
            is_reposted={is_reposted}
            queryKey={queryKey}
          />
        </div>
        <button
          type="button"
          onClick={handleSharePost}
          className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer"
          aria-label="Share post"
          title="Share post"
        >
          <Send className="w-5 h-5 md:h-6 md:w-6" />
          <span>Share</span>
        </button>
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer">
          <BarChart2 className="w-5 h-5 md:h-6 md:w-6" />
          <span>{impression_count ?? 0}</span>
        </button>
      </div>
      {showComment && (
        <div className="mt-6 space-y-4">
          <CommentForm post_id={post_id} />
          <Comment post_id={post_id} />
        </div>
      )}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                deletePost({ post_id })
                setShowDeleteDialog(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        shareUrl={shareUrl}
        shareText={`Check out this post on Skills4Hire${post_content ? `: ${post_content.slice(0, 100)}` : ''}`}
      />
    </div>
  )
}
