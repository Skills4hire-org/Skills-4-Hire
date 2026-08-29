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
      `/api/v1/bookings/?booking_status__icontains=${booking_status}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const addBooking = async (data: BookingInfo) => {
  try {
    const response = await api.post('/api/v1/bookings/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const bookingAction = async ({
  id,
  action,
}: {
  id: string | undefined
  action: string
}) => {
  try {
    const response = await api.post(`/api/v1/bookings/${id}/${action}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const approveBookingPayment = async ({
  id,
  amount,
}: {
  id: string | undefined
  amount: string
}) => {
  try {
    const response = await api.post(`/api/v1/bookings/${id}/release/payment/`, {
      amount,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
