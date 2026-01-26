import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const login = async (data: any) => {
  try {
    const response = await api.post(`/api/v1/auth/account/login`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
