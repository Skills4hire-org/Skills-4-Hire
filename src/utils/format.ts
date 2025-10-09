import { format, isToday, isYesterday } from 'date-fns'
import { availableServices } from './database'
import type { AvailableServices, Notification } from './types'
import { AiFillNotification } from 'react-icons/ai'
import type { IconType } from 'react-icons/lib'
import { MdCancel } from 'react-icons/md'
import { TbMessage, TbMoneybag } from 'react-icons/tb'

export const getBasePath = (pathname: string) => {
  return pathname.split('/').slice(0, 3).join('/')
}
export const currencyFormatter = (price: number | undefined) => {
  if (price || price == 0) {
    const amount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol',
    }).format(price)
    return amount
  }
}
export const dateFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    return formattedDate
  }
}
export const timeFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedDate
  }
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)

  if (isToday(date)) {
    return `Today, ${format(date, 'hh:mm a')}`
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'hh:mm a')}`
  }

  return format(date, 'MMM d, yyyy, hh:mm a')
}

export const groupedServicesByCategory = availableServices.reduce(
  (acc, current) => {
    ;(acc[current.category] ??= []).push(current)
    return acc
  },
  {} as Record<string, AvailableServices[]>
)

const amount = currencyFormatter(10000)
export const getNotificationDetails: Record<
  string,
  { title: string; message: string; icon: IconType; className: string }
> = {
  canceled: {
    title: 'Job canceled',
    message:
      'The client has canceled the request. Stay tuned for more opportunities',
    icon: MdCancel,
    className: 'text-red-500',
  },

  earned: {
    title: 'Earnings update',
    message: `You’ve made ${amount} this week. Keep up the great work`,
    icon: TbMoneybag,
    className: 'text-green-500',
  },
  message: {
    title: 'New message',
    message:
      'A client has sent you a message regarding a job. Check your inbox.',
    icon: TbMessage,
    className: 'text-blue-500',
  },
  job: {
    title: 'New job alert',
    message:
      'A client has sent you a message regarding a job. Check your inbox.',
    icon: AiFillNotification,
    className: 'text-yellow-500',
  },
}

export function groupByDay(notifications: Notification[]) {
  return notifications.reduce(
    (groups: Record<string, Notification[]>, notification) => {
      const date = new Date(notification.createdAt)

      let groupKey: string
      if (isToday(date)) {
        groupKey = 'Today'
      } else if (isYesterday(date)) {
        groupKey = 'Yesterday'
      } else {
        groupKey = format(date, 'EEEE, d MMMM yyyy')
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(notification)
      return groups
    },
    {}
  )
}
