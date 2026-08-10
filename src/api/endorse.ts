import type { Endorse } from '@/types/endorse.types'
import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const endorse = async (data: Endorse) => {
  try {
    const response = await api.post('/api/v1/endorsement/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getProviderEndorsers = async ({
  provider_id,
  pageParam,
}: {
  provider_id: string | undefined
  pageParam: string | undefined
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }

    const response = await api.get(`/api/v1/endorsement/?other=${provider_id}`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMyEndorsers = async ({
  pageParam,
}: {
  pageParam: string | undefined
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }

    const response = await api.get(`/api/v1/endorsement/?mine=True`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMyEndorsed = async ({
  pageParam,
}: {
  pageParam: string | undefined
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }

    const response = await api.get(`/api/v1/endorsement/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
