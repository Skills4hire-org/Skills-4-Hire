import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/booking/bookingSlice'
import registrationReducer from './features/registration/registrationSlice'

export const store = configureStore({
  reducer: {
    bookingState: bookingReducer,
    registrationState: registrationReducer,
  },
})
