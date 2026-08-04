import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { Address } from '@/types/bookings.type'

export const getMyAddresses = async (pageParam: string | undefined) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get('/api/v1/address/')
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const addAddress = async (data: Address) => {
  try {
    const response = await api.post('/api/v1/address/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const deleteAddress = async (id?: string) => {
  try {
    const response = await api.delete(`/api/v1/address/${id}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
