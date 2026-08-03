import { getAllServices, getServiceCategories } from '@/api/services'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useAllServices = ({ category }: { category?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['services', category],
    queryFn: ({ pageParam }) => getAllServices({ pageParam, category }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useServiceCategories = () =>
  useQuery({
    queryKey: ['service-categories'],
    queryFn: getServiceCategories,
    retry: 1,
  })
