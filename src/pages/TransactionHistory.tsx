import {
  customerWalletTabsList,
  serviceProviderWalletTabsList,
} from '@/assets/data'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import TabHead from '@/components/global/TabHead'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Tabs } from '@/components/ui/tabs'
import WalletTabContent from '@/components/wallet/WalletTabContent'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useTransactions } from '@/hooks/useWallet'
import type { UserType } from '@/utils/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function TransactionHistory() {
  const [status, setStatus] = useState('pending')
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useTransactions({ status: status.toUpperCase() })
  const transactions = data?.pages.flatMap((page) => page.results) ?? []
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleTransactionsFetchingError = async () => {
    refetch()
  }

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const tabsList =
    userType == 'customer'
      ? customerWalletTabsList
      : serviceProviderWalletTabsList

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Transaction History" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <Tabs
          defaultValue="pending"
          className="w-full max-w-6xl xl:max-w-7xl mx-auto"
        >
          <TabHead tabList={tabsList} setStatus={setStatus} />
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {isError && !data ? (
                <div className="py-6">
                  <Error
                    text={`Failed to load transactions`}
                    buttonFunc={handleTransactionsFetchingError}
                    buttonText="Retry"
                  />
                </div>
              ) : (
                <>
                  <WalletTabContent transactions={transactions} />

                  <div ref={loadMoreRef} />

                  {isFetchingNextPage && (
                    <div className="py-4 text-center">
                      <Loading />
                    </div>
                  )}
                  {hasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md block w-max mx-auto"
                      onClick={() => fetchNextPage()}
                    >
                      Load more
                    </button>
                  )}
                  {isFetchNextPageError && (
                    <Error
                      text="Failed to load more transactions"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </Tabs>
      </Container>
    </div>
  )
}
