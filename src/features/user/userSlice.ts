import type { AuthUser } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'user'

const defaultState: AuthUser = {
  userType: null,
  access: null,
  refresh: null,
  user_data: null,
}

const getUserFromLocalStorage: () => AuthUser = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaultState
  try {
    const parsed = JSON.parse(stored)
    return parsed?.user_data
      ? { ...defaultState, ...parsed }
      : defaultState
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return defaultState
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage(),
  reducers: {
    setUserCredentials: (state, action) => {
      const { access, refresh, user_data } = action.payload
      state.access = access
      state.refresh = refresh
      state.user_data = user_data
      state.userType = user_data.is_customer ? 'customer' : 'professional'
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload
      state.access = accessToken
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    setUserType: (state, action) => {
      const userType = action.payload as 'customer' | 'professional'
      state.userType = userType
      if (state.user_data) {
        state.user_data.is_customer = userType === 'customer'
        state.user_data.is_provider = userType === 'professional'
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    logoutUser: () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState))
      return defaultState
    },
  },
})

export const { setUserCredentials, setAccessToken, setUserType, logoutUser } =
  userSlice.actions

export default userSlice.reducer