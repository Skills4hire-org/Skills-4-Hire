import { createBooking, getBookings } from '@/api/bookings'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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

export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  const createBookingAction = async (data: Record<string, unknown>) => {
    try {
      const response = await createBooking(data)
      return response
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  const createBookingFunction = useMutation({
    mutationFn: createBookingAction,
    onSuccess: () => {
      toast.success('Booking created successfully')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (error: any) => {
      toast.error(error?.message)
    },
  })

  return createBookingFunction
}
