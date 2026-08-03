import type { BookingInfo } from '@/types/bookings.type'
import type { Service } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

interface Booking {
  services: Service[]
  step: number
  info: BookingInfo
}

const defaultState: Booking = {
  services: [],
  step: 1,
  info: {
    notes: '',
    start_date: '',
    time: '',
    date: '',
    is_remote: false,
    address: null,
    provider: '',
    price: '',
    descriptions: '',
    is_urgent: false,
  },
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: defaultState,
  reducers: {
    addService: (state, action) => {
      const { service } = action.payload
      state.services.push(service)
    },
    removeService: (state, action) => {
      const { id } = action.payload
      state.services = state.services.filter(
        (service: Service) => service.service_id !== id,
      )
    },
    resetService: (state) => {
      state.services = []
    },
    handleSteps: (state, action) => {
      const { step } = action.payload
      state.step = step
    },
    handleBookingInfo: (state, action) => {
      const { info } = action.payload
      state.info = { ...state.info, ...info }
    },
    resetBooking: (state) => {
      state.services = []
      state.step = 1
      state.info = { ...defaultState.info }
    },
  },
})

export const {
  addService,
  removeService,
  resetService,
  handleSteps,
  handleBookingInfo,
  resetBooking,
} = bookingSlice.actions

export default bookingSlice.reducer
