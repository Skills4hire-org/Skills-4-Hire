import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClientConfig.ts'
import ErrorBoundary from './components/global/ErrorBoundary'
import { NotificationSeenProvider } from './contexts/notification-seen'
import { logoutUser, setUserCredentials } from './features/user/userSlice'

window.addEventListener('storage', (event) => {
  if (event.key !== 'user' || event.storageArea !== localStorage) return

  const stored = event.newValue
  if (!stored) {
    store.dispatch(logoutUser())
    return
  }

  try {
    const parsed = JSON.parse(stored)
    if (parsed?.user_data) {
      store.dispatch(
        setUserCredentials({
          access: parsed.access,
          refresh: parsed.refresh,
          user_data: parsed.user_data,
        }),
      )
    } else {
      store.dispatch(logoutUser())
    }
  } catch {
    store.dispatch(logoutUser())
  }
})

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NotificationSeenProvider>
        <Toaster position="top-center" />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </NotificationSeenProvider>
    </QueryClientProvider>
  </Provider>,
)
