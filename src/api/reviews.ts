import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getReviews = async (pageParam?: string) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/reviews/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const giveReview = async ({
  provider_id,
  reviews,
  ratings,
}: {
  provider_id: string | undefined
  reviews: string
  ratings: number
}) => {
  try {
    const response = await api.post(`/api/v1/reviews/`, {
      provider_id,
      reviews,
      ratings,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
