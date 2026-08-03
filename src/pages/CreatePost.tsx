import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PostForm from '@/components/form/PostForm'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useCreatePost } from '@/hooks/usePosts'
import { useMyProfile } from '@/hooks/useUsers'
import type { CreatePost } from '@/types/post.types'
import type { Profile } from '@/types/user.types'

export default function CreatePost() {
  const { data, isLoading, isError, refetch } = useMyProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()

  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar

  const handleProfileRefetch = () => {
    refetch()
  }

  const onSubmit = (allData: CreatePost) => {
    createPost(allData, {
      onSuccess: () => {
        navigate('/professional/home/posts')
        toast.success('Post created successfully')
      },
      onError: (error) => {
        setIsSubmitting(false)
        toast.error(error.message)
      },
    })
  }

  return (
    <div className="pb-10 max-[1023px]:min-[768px]:w-135 max-[1023px]:min-[768px]:ml-17">
      <HeaderWithBackNavigation title="Create Post" />
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
                  text="An error occured"
                  buttonFunc={handleProfileRefetch}
                />
              </div>
            ) : (
              <>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2 md:gap-4">
                    <ProfileImage
                      noStatus
                      size="size-12 md:size-16"
                      avatar={avatar}
                    />
                    <p className="text-xl md:text-2xl font-medium">
                      {user?.user?.profile?.display_name}
                    </p>
                  </div>
                  <PostForm
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
