import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import NotificationCard from '@/components/notification/NotificationCard'
import { groupNotificationsByDay } from '@/utils/format'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import { useMarkNotificationRead, useNotifications, type AppNotification } from '@/hooks/useNotifications'

export default function Notification() {
  const { data, isLoading, isError, refetch } = useNotifications()
  const { mutate: markRead } = useMarkNotificationRead()
  const notifications: AppNotification[] = data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const groupedNotifications = groupNotificationsByDay(
    notifications.map((item) => ({ id: item.notification_id, type: item.event || 'notification', createdAt: item.created_at })),
  )
  const groupedNotificationsArray = Object.entries(groupedNotifications)
  return (
    <div className="space-y-2 md:space-y-4 lg:w-[64rem] lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <HeaderWithBackNavigation title="Notification" onlyMobile />
      <Container className="bg-white">
        <TitleOnlyDesktopHeader title="Notification" />
      </Container>
      <Container>
        {isLoading ? <div className="h-24"><Loading /></div> : isError ? <Error text="Failed to load notifications" buttonFunc={refetch} /> : groupedNotificationsArray.length === 0 ? <p className="py-8 text-center text-gray-500">You have no notifications yet.</p> : groupedNotificationsArray.map(([day, notification]) => {
          return (
            <div key={day} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold capitalize">
                {day}
              </h3>

              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {notification.map((notification) => {
                  const apiNotification = notifications.find((item) => item.notification_id === notification.id)
                  return apiNotification ? <NotificationCard key={notification.id} event={apiNotification.event} content={apiNotification.content} createdAt={apiNotification.created_at} isRead={apiNotification.is_read} onRead={() => !apiNotification.is_read && markRead(apiNotification.notification_id)} /> : null
                })}
              </div>
            </div>
          )
        })}
      </Container>
    </div>
  )
}
