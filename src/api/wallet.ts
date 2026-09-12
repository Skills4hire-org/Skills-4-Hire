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
  type,
}: {
  pageParam?: string
  status?: string
  type?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const params = new URLSearchParams()
    if (status) params.set('status__icontains', status)
    if (type) params.set('type__icontains', type)
    const query = params.toString()

    const response = await api.get(
      `/api/v1/wallet/transactions/${query ? `?${query}` : ''}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getBanks = async () => {
  try {
    const response = await api.get(`/banks/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const resolveBanksDetails = async (data: {
  account_number: string | undefined
  bank_code: string | undefined
  currency: string | undefined
}) => {
  try {
    const response = await api.post(`/api/v1/bank/resolve/`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getSavedBankAccounts = async ({
  pageParam,
}: {
  pageParam: string | undefined
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/bank/resolve/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const initiateWithdrawal = async (data: {
  account_number: string | undefined
  bank_code: string | undefined
  amount: string | undefined
  currency: string | undefined
}) => {
  try {
    const response = await api.post(`/api/v1/wallet/withdraw/`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const pollWithdrawal = async (data: {
  transfer_id: string | undefined
}): Promise<'COMPLETED' | 'FAILED' | null> => {
  const maxAttempts = 10
  const pollingInterval = 3000

  if (!data.transfer_id) return null

  try {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await api.post(`/api/v1/wallet/transfer/process/`, data)

      const status = response?.data?.status

      if (status === 'COMPLETED' || status === 'FAILED') {
        return status
      }

      await new Promise((resolve) => setTimeout(resolve, pollingInterval))
    }

    return null
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const initiateDeposit = async (data: {
  payment_method: string
  amount: string | undefined
  currency: string | undefined
}) => {
  try {
    const response = await api.post(`/api/v1/wallet/deposit/`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const pollDeposit = async (data: {
  charge_id: string | undefined
}): Promise<'COMPLETED' | 'FAILED' | null> => {
  const maxAttempts = 10
  const pollingInterval = 3000

  if (!data.charge_id) return null

  try {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await api.post(`/api/v1/wallet/deposit/process/`, data)

      const status = response?.data?.status

      if (status === 'COMPLETED' || status === 'FAILED') {
        return status
      }

      await new Promise((resolve) => setTimeout(resolve, pollingInterval))
    }

    return null
  } catch (error) {
    handleApiError(error)
    return null
  }
}
