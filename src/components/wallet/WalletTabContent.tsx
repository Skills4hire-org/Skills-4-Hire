import { walletTabsList } from '@/assets/data'
import { transactionHistory } from '@/utils/database'
import { TabsContent } from '../ui/tabs'
import TransactionCard from './TransactionCard'
import NoTransactionHistory from './NoTransactionHistory'

export default function WalletTabContent() {
  const groupTransactionByStatusAndDate = (status: string) => {
    return transactionHistory?.filter(
      (transaction) =>
        transaction?.status?.toLowerCase() === status.toLowerCase()
    )
  }
  return (
    <>
      {walletTabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-2 md:space-y-4 md:py-1">
            {groupTransactionByStatusAndDate(status)?.map(
              (transaction, index) => (
                <TransactionCard key={index} {...transaction} />
              )
            )}

            {groupTransactionByStatusAndDate(status)?.length == 0 && (
              <NoTransactionHistory label={label} />
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
