import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getNotifications = async ({ pageParam, unreadOnly = false, event }: { pageParam?: string; unreadOnly?: boolean; event?: string } = {}) => {
  try {
    if (pageParam) return (await api.get(pageParam)).data
    const params: Record<string, string> = {}
    if (unreadOnly) params.is_read = 'false'
    if (event) params.event = event
    return (await api.get('/api/v1/notifications/', { params: Object.keys(params).length ? params : undefined })).data
  } catch (error) { handleApiError(error) }
}

export const markNotificationRead = async (notificationId: string) => {
  try { return (await api.post(`/api/v1/notifications/${notificationId}/mark-read/`, {})).data }
  catch (error) { handleApiError(error) }
}
