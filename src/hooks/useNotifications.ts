import { getNotifications, markNotificationRead } from '@/api/notifications'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export type AppNotification = { notification_id: string; event?: string | null; content?: string | null; created_at: string; is_read: boolean }

export const useNotifications = ({ unreadOnly = false, event }: { unreadOnly?: boolean; event?: string } = {}) => useInfiniteQuery({
  queryKey: ['notifications', unreadOnly, event], queryFn: ({ pageParam }) => getNotifications({ pageParam, unreadOnly, event }),
  initialPageParam: undefined as string | undefined, getNextPageParam: (lastPage) => lastPage?.next ?? undefined, retry: 1,
})

export const useUnreadNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  return { ...query, count: notifications.filter((item) => !item.is_read).length }
}

export const useHireRequestNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true, event: 'booking_created' })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  return { ...query, count: notifications.filter((item) => !item.is_read).length }
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: markNotificationRead, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }) })
}
