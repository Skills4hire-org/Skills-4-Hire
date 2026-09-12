import { getReviews, giveReview } from '@/api/reviews'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useReviews = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: ({ pageParam }) => getReviews(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useGiveReview = () => {
  const giveReviewAction = async ({
    provider_id,
    reviews,
    ratings,
  }: {
    provider_id: string | undefined
    reviews: string
    ratings: number
  }) => {
    try {
      await giveReview({ provider_id, reviews, ratings })
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const giveReviewFunction = useMutation({
    mutationFn: giveReviewAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
  return giveReviewFunction
}
