import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { ChatMessageParams, CreateConversation } from '@/types/chat.types'

export const createConversation = async (data: CreateConversation) => {
  try {
    const response = await api.post('/api/v1/conversation/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const getConversationList = async () => {
  try {
    const response = await api.get(`/api/v1/conversation/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const createMessage = async ({
  conversation_id,
  data,
}: {
  conversation_id: string
  data: {
    content: string
  }
}) => {
  try {
    const response = await api.post(
      `/api/v1/conversation/${conversation_id}/messages/`,
      data,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMessages = async ({
  conversation_id,
  ordering,
  cursor,
  page_size,
}: ChatMessageParams) => {
  try {
    const response = await api.get(
      `/api/v1/conversation/${conversation_id}/messages/?page_size=${page_size && page_size}&ordering=${ordering && ordering}&cursor${cursor && cursor}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
