import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getNotifications = async ({ pageParam, unreadOnly = false }: { pageParam?: string; unreadOnly?: boolean } = {}) => {
  try {
    if (pageParam) return (await api.get(pageParam)).data
    return (await api.get('/api/v1/notifications/', { params: unreadOnly ? { is_read: false } : undefined })).data
  } catch (error) { handleApiError(error) }
}

export const markNotificationRead = async (notificationId: string) => {
  try { return (await api.post(`/api/v1/notifications/${notificationId}/mark-read/`, {})).data }
  catch (error) { handleApiError(error) }
}
