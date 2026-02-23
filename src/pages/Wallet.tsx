import Container from '@/components/global/Container'
import SectionHeading from '@/components/services/SectionHeading'
import DesktopWalletHeader from '@/components/header/DesktopWalletHeader'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import WalletActions from '@/components/wallet/WalletActions'
import WalletBalance from '@/components/wallet/WalletBalance'
import { transactionHistory } from '@/utils/database'
import { groupTransactionsByDay } from '@/utils/format'
import TransactionCard from '@/components/wallet/TransactionCard'
import NoTransactionHistory from '@/components/wallet/NoTransactionHistory'

export default function Wallet() {
  const transactionStatus = transactionHistory?.filter(
    (transaction) => transaction?.status?.toLowerCase() === 'pending',
  )
  const groupedTransactions = groupTransactionsByDay(transactionStatus)
  const groupedTransactionsArray = Object.entries(groupedTransactions)

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Container className="bg-white">
          <MobileWalletHeader />
          <DesktopWalletHeader />
        </Container>
        <Container className="py-2 md:py-4">
          <WalletBalance />
        </Container>
        <Container className="py-4 md:py-5 bg-white">
          <WalletActions />
        </Container>
      </div>
      <Container>
        <div className="space-y-2">
          <SectionHeading heading="Pending Payment" />

          <div className="space-y-2 md:space-y-4">
            {groupedTransactionsArray?.map(([day, transaction]) => (
              <div key={day} className="space-y-2 md:space-y-3 ">
                <h3 className="text-sm md:text-base font-semibold capitalize text-muted-foreground">
                  {day}
                </h3>

                <div className="grid grid-cols-1 gap-3 md:gap-4 max-w-xl mx-auto">
                  {transaction.map((transaction, index) => (
                    <TransactionCard key={index} {...transaction} />
                  ))}
                </div>
              </div>
            ))}

            {groupedTransactionsArray?.length == 0 && (
              <NoTransactionHistory label="pending" />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
