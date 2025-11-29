import { providerOverviewData } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import NoReviewCard from '@/components/reviews/NoReviewCard'
import ReviewCard from '@/components/reviews/ReviewCard'
import { user } from '@/utils/database'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

function Reviews() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const reviews =
    userType == 'customer' ? user?.reviews : providerOverviewData?.reviews
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Reviews" />
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
          {reviews?.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
        {reviews?.length === 0 && <NoReviewCard />}
      </Container>
    </div>
  )
}
export default Reviews
