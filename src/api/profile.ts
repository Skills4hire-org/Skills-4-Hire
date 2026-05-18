import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { ProviderParams } from '@/types/user.types'

export const getMyProfile = async () => {
  try {
    const response = await api.get('/api/v1/profile')
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getUserProfile = async (id: string | undefined) => {
  try {
    const response = await api.get(`/api/v1/profile/${id}`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getProviders = async ({
  search,
  profession,
  min_charge,
  ratings,
  pageParam,
}: ProviderParams) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
      `/api/v1/profile_search/?q=${search && search}&professional_title_icontains=${profession && profession}&min_charge_gte=${min_charge && min_charge}&reviews_ratings_gte=${ratings && ratings}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getProviderDetails = async (id: string | undefined) => {
  try {
    const response = await api.get(`/api/v1/profile_search/${id}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
