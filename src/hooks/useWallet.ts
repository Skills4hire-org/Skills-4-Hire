import { getTransactions, getWalletBalance } from '@/api/wallet'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  const getWallet = async () => {
    const wallet = await getWalletBalance()
    return wallet
  }
  const queryData = useQuery({
    queryKey: ['wallet'],
    queryFn: getWallet,
  })
  return queryData
}

export const useTransactions = ({ status }: { status?: string } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['transactions', status],
    queryFn: ({ pageParam }) => getTransactions({ pageParam, status }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    retry: 1,
  })
  return queryData
}
