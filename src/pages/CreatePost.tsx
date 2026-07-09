import PostForm from '@/components/form/PostForm'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function CreatePost() {
  const { data, isLoading, isError, refetch } = useMyProfile()

  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar

  const handleProfileRefetch = () => {
    refetch()
  }

  return (
    <div className="pb-10">
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
                  <PostForm />
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
