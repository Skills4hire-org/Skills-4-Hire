import {
  getBanks,
  getSavedBankAccounts,
  getTransactions,
  getWalletBalance,
} from '@/api/wallet'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  const getWallet = async () => {
    const wallet = await getWalletBalance()
    return wallet
  }
  const queryData = useQuery({
    queryKey: ['wallet'],
    queryFn: getWallet,
    refetchOnMount: 'always',
  })
  return queryData
}

export const useTransactions = ({
  status,
  type,
}: { status?: string; type?: string } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['transactions', status],
    queryFn: ({ pageParam }) => getTransactions({ pageParam, status, type }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    retry: 1,
    refetchOnMount: 'always',
  })
  return queryData
}

export const useBanks = () => {
  const getBanksDetails = async () => {
    const banks = await getBanks()
    return banks
  }
  const queryData = useQuery({
    queryKey: ['banks'],
    queryFn: getBanksDetails,
  })
  return queryData
}

export const useSavedBankAccounts = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['bank-accounts'],
    queryFn: ({ pageParam }) => {
      return getSavedBankAccounts({ pageParam })
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
    refetchOnMount: 'always',
  })
  return queryData
}
