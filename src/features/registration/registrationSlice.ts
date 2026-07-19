import type { Registration } from '@/types/onboard.types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: Registration = {
  additionalInfo: {
    service: undefined,
    country: '',
    state: '',
    city: '',
    address: '',
    dateOfBirth: '',
    headline: '',
  },
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState: defaultState,

  reducers: {
    completeProfile: (state, action) => {
      const { additionalInfo } = action.payload
      state.additionalInfo = { ...state.additionalInfo, ...additionalInfo }
    },

    clearForm: (state) => {
      state.additionalInfo = defaultState.additionalInfo
    },
  },
})

export const { completeProfile, clearForm } = registrationSlice.actions

export default registrationSlice.reducer
