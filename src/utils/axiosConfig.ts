import { logoutUser, setAccessToken } from '@/features/user/userSlice'
import { store } from '@/store'
import axios from 'axios'
import { isTokenExpired } from './helpers'

let refreshPromise: Promise<string> | null = null

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) return refreshPromise

  const state = store.getState()
  const refreshToken = state.userState.refresh

  if (!refreshToken) {
    store.dispatch(logoutUser())
    throw new Error('Your session has expired. Please sign in again.')
  }

  refreshPromise = axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh/token/`,
      { refresh: refreshToken },
    )
    .then((res) => {
      const newAccess = res.data.access

      store.dispatch(setAccessToken(newAccess))

      return newAccess
    })
    .catch((err) => {
      store.dispatch(logoutUser())
      throw err
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  timeoutErrorMessage:
    'The request timed out. Kindly try again or refresh your page',
})

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(async (config) => {
  const state = store.getState()
  let token = state.userState.access

  if (token) {
    if (isTokenExpired(token)) {
      if (state.userState.refresh) {
        try {
          token = await refreshAccessToken()
        } catch (err) {
          return Promise.reject(err) // logout already handled, abort the request
        }
      } else {
        // Stale or partial session: no refresh token to renew the access
        // token with. Clear the leftover session so public requests such as
        // registration, OTP verification, or onboarding are not blocked, and
        // protected requests simply fail as unauthenticated.
        store.dispatch(logoutUser())
        return config
      }
    }

    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* RESPONSE INTERCEPTOR */

api.interceptors.response.use(
  (response) => {
    if (response.data?.success && response.data?.data !== undefined) {
      response.data = response.data.data
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    const noTokenRefreshUrls = /(\/auth\/|\/onboard\/)/

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !noTokenRefreshUrls.test(originalRequest.url ?? '')
    ) {
      originalRequest._retry = true

      try {
        const newAccess = await refreshAccessToken()

        originalRequest.headers.Authorization = `Bearer ${newAccess}`

        return api(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)
