import { addAddress, deleteAddress, getMyAddresses } from '@/api/address'
import { addBooking, getBookings } from '@/api/bookings'
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
      return lastPage.data.next ?? undefined
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
  const addAddressAction = async (data: BookingInfo) => {
    try {
      await addBooking(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addAddressFunction = useMutation({
    mutationFn: addAddressAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  return addAddressFunction
}
