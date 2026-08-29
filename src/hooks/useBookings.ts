import { addAddress, deleteAddress, getMyAddresses } from '@/api/address'
import {
  addBooking,
  approveBookingPayment,
  bookingAction,
  getBookings,
} from '@/api/bookings'
import type { Address, BookingInfo } from '@/types/bookings.type'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useBookings = ({ booking_status }: { booking_status: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['bookings', booking_status],
    queryFn: ({ pageParam }) => getBookings({ pageParam, booking_status }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyAddress = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['address'],
    queryFn: ({ pageParam }) => {
      return getMyAddresses(pageParam)
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useAddAddress = () => {
  const addAddressAction = async (data: Address) => {
    try {
      await addAddress(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addAddressFunction = useMutation({
    mutationFn: addAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
    },
  })

  return addAddressFunction
}
export const useDeleteAddress = () => {
  const deleteAddressAction = async (id?: string) => {
    try {
      await deleteAddress(id)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteAddressFunction = useMutation({
    mutationFn: deleteAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
    },
  })
  return deleteAddressFunction
}

export const useAddBooking = () => {
  const addBookingAction = async (data: BookingInfo) => {
    try {
      await addBooking(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addBookingFunction = useMutation({
    mutationFn: addBookingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      queryClient.invalidateQueries({ queryKey: ['profile-overview'] })
    },
  })

  return addBookingFunction
}

export const useBookingAction = () => {
  const bookingRequestAction = async ({
    id,
    action,
  }: {
    id: string | undefined
    action: string
  }) => {
    try {
      await bookingAction({ id, action })
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const bookingFunction = useMutation({
    mutationFn: bookingRequestAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['profile-overview'] })
    },
  })
  return bookingFunction
}

export const useApproveBookingPayment = () => {
  const approveBookingPaymentAction = async ({
    id,
    amount,
  }: {
    id: string | undefined
    amount: string
  }) => {
    try {
      await approveBookingPayment({ id, amount })
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const approveBookingPaymentFunction = useMutation({
    mutationFn: approveBookingPaymentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
  return approveBookingPaymentFunction
}
