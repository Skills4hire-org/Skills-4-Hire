import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import PostForm from '@/components/form/PostForm'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useEditPost, usePost } from '@/hooks/usePosts'
import type { CreatePost } from '@/types/post.types'

export default function UpdatePost() {
  const { id } = useParams()
  const { data: post, isError, isLoading } = usePost({ post_id: id })
  const { mutate: updatePost } = useEditPost()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handlePostFetchingError = () => {}

  const onSubmit = (allData: CreatePost) => {
    updatePost(
      { post_id: id, data: allData },
      {
        onSuccess: () => {
          navigate('/professional/home/posts')
        },
        onError: (error) => {
          setIsSubmitting(false)
          toast.error(error.message || 'Unable to update your post.')
        },
      },
    )
  }

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Edit Post" />
      <Container className="pt-1 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError ? (
              <div className="py-10">
                <Error
                  text="Failed to load post"
                  buttonFunc={handlePostFetchingError}
                />
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-4">
                  <ProfileImage
                    noStatus
                    size="size-12 md:size-16"
                    avatar={post?.user?.profile?.avatar?.avatar}
                  />
                  <p className="text-xl md:text-2xl font-medium">
                    {post?.user?.profile?.display_name}
                  </p>
                </div>
                <PostForm
                  post={post}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
