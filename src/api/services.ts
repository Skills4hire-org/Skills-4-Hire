import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getAllServices = async ({
  category,
  pageParam,
}: {
  category?: string
  pageParam?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get('/api/v1/services/', {
      params: category ? { category__name: category } : undefined,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getServiceCategories = async () => {
  try {
    const response = await api.get('/api/v1/services-categories/')
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
