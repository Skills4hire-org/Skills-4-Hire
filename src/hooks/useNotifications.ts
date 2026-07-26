import { getNotifications, markNotificationRead } from '@/api/notifications'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export type AppNotification = { notification_id: string; event?: string | null; content?: string | null; created_at: string; is_read: boolean }

export const useNotifications = (unreadOnly = false) => useInfiniteQuery({
  queryKey: ['notifications', unreadOnly], queryFn: ({ pageParam }) => getNotifications({ pageParam, unreadOnly }),
  initialPageParam: undefined as string | undefined, getNextPageParam: (lastPage) => lastPage?.next ?? undefined, retry: 1,
})

export const useUnreadNotificationCount = () => {
  const query = useNotifications(true)
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  return { ...query, count: notifications.filter((item) => !item.is_read).length }
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: markNotificationRead, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }) })
}
