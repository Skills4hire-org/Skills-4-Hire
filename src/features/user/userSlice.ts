import type { AuthUser } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: AuthUser = {
  userType: 'professional',
  access: null,
  refresh: null,
  user_data: null,
  avatar: '',
}

const getUserFromLocalStorage: () => AuthUser = () => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : defaultState
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
      state.avatar = user_data?.profile?.avatar?.avatar
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload
      state.access = accessToken
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setProfilePhoto: (state, action) => {
      const url = action.payload
      state.avatar = url
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    logoutUser: () => {
      sessionStorage.setItem('user', JSON.stringify(defaultState))
    },
  },
})

export const {
  setUserCredentials,
  setAccessToken,
  logoutUser,
  setProfilePhoto,
} = userSlice.actions

export default userSlice.reducer
