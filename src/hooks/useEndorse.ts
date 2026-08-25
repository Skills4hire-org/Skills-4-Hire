import {
  endorse,
  getMyEndorsed,
  getMyEndorsers,
  getProviderEndorsers,
} from '@/api/endorse'
import type { Endorse } from '@/types/endorse.types'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useEndorse = () => {
  const endorseAction = async (data: Endorse) => {
    try {
      await endorse(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const endorseFunction = useMutation({
    mutationFn: endorseAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorse'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return endorseFunction
}

export const useProviderEndorsers = ({
  provider_id,
}: {
  provider_id: string | undefined
}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['endorse'],
    queryFn: ({ pageParam }) => {
      return getProviderEndorsers({ pageParam, provider_id })
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyEndorsers = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['endorse'],
    queryFn: ({ pageParam }) => {
      return getMyEndorsers({ pageParam })
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyEndorsed = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['endorse'],
    queryFn: ({ pageParam }) => {
      return getMyEndorsed({ pageParam })
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
