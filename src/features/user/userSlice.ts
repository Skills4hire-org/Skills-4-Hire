import type { AppUser } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: AppUser = {
  userType: 'customer',
  isServiceProvider: false,
}

const getUserFromLocalStorage: () => AppUser = () => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : defaultState
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage(),
  reducers: {
    setUserType: (state, action) => {
      const { userType } = action.payload
      state.userType = userType
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setServiceProviderStatus: (state, action) => {
      const { serviceProviderStatus } = action.payload
      state.isServiceProvider = serviceProviderStatus
      sessionStorage.setItem('user', JSON.stringify(state))
    },
  },
})

export const { setUserType, setServiceProviderStatus } = userSlice.actions

export default userSlice.reducer
