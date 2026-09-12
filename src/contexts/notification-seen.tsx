import { createContext, useCallback, useContext, useState } from 'react'

type Category = 'hireRequests' | 'jobs' | 'messages' | 'notifications'

interface NotificationSeenState {
  hireRequests: number
  jobs: number
  messages: number
  notifications: number
}

interface NotificationSeenContextType {
  lastSeen: NotificationSeenState
  markSeen: (category: Category) => void
}

const NotificationSeenContext = createContext<NotificationSeenContextType | null>(null)

const STORAGE_KEY = 'notificationLastSeen'

function loadFromStorage(): NotificationSeenState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { hireRequests: 0, jobs: 0, messages: 0, notifications: 0 }
}

function saveToStorage(state: NotificationSeenState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function NotificationSeenProvider({ children }: { children: React.ReactNode }) {
  const [lastSeen, setLastSeen] = useState<NotificationSeenState>(loadFromStorage)

  const markSeen = useCallback((category: Category) => {
    setLastSeen((prev) => {
      const next = { ...prev, [category]: Date.now() }
      saveToStorage(next)
      return next
    })
  }, [])

  return (
    <NotificationSeenContext.Provider value={{ lastSeen, markSeen }}>
      {children}
    </NotificationSeenContext.Provider>
  )
}

export function useNotificationSeenContext() {
  const context = useContext(NotificationSeenContext)
  if (!context) throw new Error('useNotificationSeenContext must be used within NotificationSeenProvider')
  return context
}

export type { Category }
