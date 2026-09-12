import Container from '@/components/global/Container'
import SectionHeading from '@/components/services/SectionHeading'
import DesktopWalletHeader from '@/components/header/DesktopWalletHeader'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import WalletBalance from '@/components/wallet/WalletBalance'
import { groupTransactionsByDay } from '@/utils/format'
import TransactionCard from '@/components/wallet/TransactionCard'
import NoTransactionHistory from '@/components/wallet/NoTransactionHistory'
import { useTransactions } from '@/hooks/useWallet'
import { Skeleton } from '@/components/ui/skeleton'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Wallet() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useTransactions({ status: 'PENDING' })

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const pendingTransactions = data?.pages.flatMap((page) => page.results) ?? []
  const handleTransactionFetchingError = () => {
    refetch()
  }
  const groupedTransactions = groupTransactionsByDay(pendingTransactions)
  const groupedTransactionsArray = Object.entries(groupedTransactions)

  return (
    <div className="space-y-4 md:space-y-6 lg:w-[64rem] lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <div>
        <Container className="bg-white">
          <MobileWalletHeader />
          <DesktopWalletHeader />
        </Container>
        <Container className="py-2 md:py-4">
          <WalletBalance />
        </Container>
      </div>
      <Container>
        <div className="space-y-2">
          <SectionHeading heading="Pending Payment" />

          <div className="space-y-2 md:space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-md" />
                ))}
              </div>
            ) : (
              <>
                {isError && !data ? (
                  <div className="py-6">
                    <Error
                      text="Failed to load your pending transactions"
                      buttonFunc={handleTransactionFetchingError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
                      {groupedTransactionsArray.map(([day, transactions]) => (
                        <div key={day} className="space-y-2 md:space-y-3">
                          <h3 className="text-sm md:text-base font-semibold capitalize text-muted-foreground">
                            {day}
                          </h3>

                          <div className="grid grid-cols-1 gap-3 md:gap-4 max-w-xl mx-auto">
                            {transactions.map((transaction, index) => (
                              <TransactionCard key={index} {...transaction} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {groupedTransactionsArray.length === 0 && (
                      <NoTransactionHistory label="pending" />
                    )}

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
          </div>
        </div>
      </Container>
    </div>
  )
}
