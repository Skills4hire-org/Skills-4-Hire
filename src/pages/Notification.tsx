import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import NotificationCard from '@/components/notification/NotificationCard'
import { notifications } from '@/utils/database'
import { groupNotificationsByDay } from '@/utils/format'

export default function Notification() {
  const groupedNotifications = groupNotificationsByDay(notifications)
  const groupedNotificationsArray = Object.entries(groupedNotifications)
  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Notification" onlyMobile />
      <Container className="bg-white">
        <TitleOnlyDesktopHeader title="Notification" />
      </Container>
      <Container>
        {groupedNotificationsArray.map(([day, notification]) => {
          return (
            <div key={day} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold capitalize">
                {day}
              </h3>

              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {notification.map((notification) => (
                  <NotificationCard key={notification.id} {...notification} />
                ))}
              </div>
            </div>
          )
        })}
      </Container>
    </div>
  )
}
