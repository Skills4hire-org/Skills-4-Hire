import { addFavourite, deleteFavourite, getFavourites } from '@/api/favourites'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useFavourites = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: ({ pageParam }) => {
      return getFavourites(pageParam)
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
    enabled,
  })
  return queryData
}

export const useAddFavourite = () => {
  const addFavouriteAction = async (provider_id: string) => {
    try {
      await addFavourite(provider_id)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addFavouriteFunction = useMutation({
    mutationFn: addFavouriteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      })
    },
  })

  return addFavouriteFunction
}

export const useDeleteFavourite = () => {
  const deleteFavouriteAction = async ({
    provider_id,
    favourite_id,
  }: {
    provider_id: string
    favourite_id: string
  }) => {
    try {
      await deleteFavourite({ provider_id, favourite_id })
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteFavouriteFunction = useMutation({
    mutationFn: deleteFavouriteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      })
    },
  })

  return deleteFavouriteFunction
}
