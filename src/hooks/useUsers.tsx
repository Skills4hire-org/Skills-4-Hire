import { getProviders } from '@/api/profile'
import type { ProviderParams } from '@/types/user.types'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useAllProviders = ({
  search,
  profession,
  min_charge,
  ratings,
}: ProviderParams) => {
  const queryData = useInfiniteQuery({
    queryKey: ['providers', search, profession, min_charge, ratings],
    queryFn: ({ pageParam }) =>
      getProviders({ pageParam, search, profession, min_charge, ratings }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
