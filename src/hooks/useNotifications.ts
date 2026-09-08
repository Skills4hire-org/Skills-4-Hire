import { getNotifications, markNotificationRead } from '@/api/notifications'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export type AppNotification = { notification_id: string; event?: string | null; content?: string | null; created_at: string; is_read: boolean }

type NotificationsPage = { results: AppNotification[]; next?: string | null }
type NotificationsInfiniteData = { pages: NotificationsPage[]; pageParams: unknown[] }

export const useNotifications = ({ unreadOnly = false, event }: { unreadOnly?: boolean; event?: string } = {}) => useInfiniteQuery({
  queryKey: ['notifications', unreadOnly, event], queryFn: ({ pageParam }) => getNotifications({ pageParam, unreadOnly, event }),
  initialPageParam: undefined as string | undefined, getNextPageParam: (lastPage) => lastPage?.next ?? undefined, retry: 1,
})

export const useUnreadNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  return { ...query, count: notifications.length }
}

export const useHireRequestNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true, event: 'booking_created' })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  return { ...query, count: notifications.length }
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] })
      const previousData = queryClient.getQueriesData<NotificationsInfiniteData>({ queryKey: ['notifications'] })

      queryClient.setQueriesData<NotificationsInfiniteData>({ queryKey: ['notifications'] }, (old) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            results: page.results.map((item) =>
              item.notification_id === notificationId ? { ...item, is_read: true } : item,
            ),
          })),
        }
      })

      return { previousData }
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
