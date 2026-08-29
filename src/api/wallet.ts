import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getWalletBalance = async () => {
  try {
    const response = await api.get(`/api/v1/wallet/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getTransactions = async ({
  pageParam,
  status,
}: {
  pageParam?: string
  status?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }

    const response = await api.get(
      `/api/v1/wallet/transactions/?status__icontains=${status}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
