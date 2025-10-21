import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/booking/bookingSlice'

export const store = configureStore({
  reducer: {
    bookingState: bookingReducer,
  },
})
