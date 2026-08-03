import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { BookingInfo } from '@/types/bookings.type'

export const getBookings = async ({
  pageParam,
  booking_status,
}: {
  pageParam: string | undefined
  booking_status: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
<<<<<<< HEAD
      `/api/v1/bookings/?booking_status_icontains=${booking_status}`,
=======
      `/api/v1/bookings/?booking_status=${booking_status}`,
>>>>>>> 742d06b4538a2774e5bab469cd60a9341e843331
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

<<<<<<< HEAD
export const addBooking = async (data: BookingInfo) => {
=======
export const createBooking = async (data: Record<string, unknown>) => {
>>>>>>> 742d06b4538a2774e5bab469cd60a9341e843331
  try {
    const response = await api.post('/api/v1/bookings/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
