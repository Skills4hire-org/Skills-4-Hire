import { deleteNotification, getNotifications, markNotificationRead } from '@/api/notifications'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationSeenContext } from '@/contexts/notification-seen'

export type AppNotification = { notification_id: string; event?: string | null; content?: string | null; created_at: string; is_read: boolean }

type NotificationsPage = { results: AppNotification[]; next?: string | null }
type NotificationsInfiniteData = { pages: NotificationsPage[]; pageParams: unknown[] }

export const useNotifications = ({ unreadOnly = false, event }: { unreadOnly?: boolean; event?: string } = {}) => useInfiniteQuery({
  queryKey: ['notifications', unreadOnly, event], queryFn: ({ pageParam }) => getNotifications({ pageParam, unreadOnly, event }),
  initialPageParam: undefined as string | undefined, getNextPageParam: (lastPage) => lastPage?.next ?? undefined, retry: 1,
  refetchInterval: 30000,
})

const parseNotificationTime = (value: string): number => {
  const normalized = value.trim().replace(' ', 'T')
  const hasTimezone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(normalized)
  const withTz = hasTimezone ? normalized : `${normalized}Z`
  const time = new Date(withTz).getTime()
  return Number.isNaN(time) ? 0 : time
}

const seenFilter = (notifications: AppNotification[], lastSeenAt: number) =>
  lastSeenAt > 0
    ? notifications.filter((n) => parseNotificationTime(n.created_at) > lastSeenAt)
    : notifications

export const useUnreadNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const { lastSeen } = useNotificationSeenContext()
  const filtered = seenFilter(notifications, lastSeen.notifications)
  return { ...query, count: filtered.length }
}

export const useHireRequestNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true, event: 'New job posted' })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const { lastSeen } = useNotificationSeenContext()
  const filtered = seenFilter(notifications, lastSeen.hireRequests)
  return { ...query, count: filtered.length }
}

export const useJobNotificationCount = () => {
  const query = useNotifications({ unreadOnly: true, event: 'New hire request' })
  const notifications: AppNotification[] = query.data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const { lastSeen } = useNotificationSeenContext()
  const filtered = seenFilter(notifications, lastSeen.jobs)
  return { ...query, count: filtered.length }
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

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteNotification,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] })
      const previousData = queryClient.getQueriesData<NotificationsInfiniteData>({ queryKey: ['notifications'] })

      queryClient.setQueriesData<NotificationsInfiniteData>({ queryKey: ['notifications'] }, (old) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages
            .map((page) => ({
              ...page,
              results: page.results.filter(
                (item) => item.notification_id !== notificationId,
              ),
            }))
            .filter((page) => page.results.length > 0 || page.next),
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
