import {
  Heart,
  MessageCircle,
  BarChart2,
  MapPin,
  Dot,
  MoreVertical,
  Pencil,
  Trash2,
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
import EndorseDialog from '../endorse/EndorseDialog'
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
  const navigate = useNavigate()

  const {
    userType,
    user_data,
  }: {
    userType: UserType
    user_data: UserData | null
  } = useSelector((state: RootState) => state.userState)
  const provider_id = user?.profile?.provider_id
  const provider_service = user?.profile?.professional_title

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
      className="bg-white lg:rounded-2xl md:rounded-2xl md:shadow lg:shadow p-3 md:p-4 space-y-2.5 md:space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2 md:gap-3">
          <Link to={`/${userType}/professionals/${provider_id}`}>
            <ProfileImage noStatus avatar={user?.profile?.avatar?.avatar} />
          </Link>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center">
              <Link
                to={`/${userType}/professionals/${provider_id}`}
                className="no-underline hover:no-underline"
              >
                <h3 className="text-[15px] md:text-base  font-semibold text-gray-900 leading-tight">
                  {user?.profile?.display_name}
                </h3>
              </Link>
              {userType == 'customer' && (
                <Dot
                  className="w-4 h-4 text-black self-center ml-1"
                  strokeWidth={6}
                />
              )}
              {userType == 'customer' && !user?.profile?.has_endorsed && (
                <EndorseDialog
                  provider_pk={provider_id}
                  name={user?.profile?.display_name as string}
                  triggerClassName="whitespace-nowrap shrink-0 capitalize font-semibold text-primary text-md md:text-sm cursor-pointer hover:underline rounded-[5px] ml-1"
                />
              )}
            </div>
            <div className="flex items-center gap-0.5 text-[12px] md:text-sm font-medium ">
              {provider_service && (
                <Link
                  to={`/customer/professionals/${provider_id}`}
                  className=" text-primary font-medium no-underline hover:no-underline block w-max capitalize"
                >
                  {provider_service.replace(/([A-Z])/g, ' $1').trim()}
                </Link>
              )}
              <Dot className="w-3 h-3 text-muted-foreground" strokeWidth={6} />
              <span className="text-gray-600">
                {formatCommentTime(created_at as string)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500 my-0.5">
              <span className="inline-flex items-center gap-1 capitalize">
                <MapPin size={13.5} className="md:w-[14px]" />{' '}
                <span className="flex items-center gap-1">
                  <span>{user?.profile?.city},</span>
                  <span>{user?.profile?.state}</span>
                </span>
              </span>

              {/* {user?.avg_rating && (
                <span className="inline-flex items-center gap-1">
                  <Star
                    size={13.5}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold text-gray-700">
                    {user?.avg_rating}
                  </span>
                  {user?.total_reviews && (
                    <span className="text-gray-500">
                      ({user?.total_reviews} review
                      {user?.total_reviews > 1 && 's'})
                    </span>
                  )}
                </span>
               )} */}
            </div>
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
          {post_content}
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
    </div>
  )
}
