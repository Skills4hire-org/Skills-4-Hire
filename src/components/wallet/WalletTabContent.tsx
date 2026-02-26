import {
  customerWalletTabsList,
  serviceProviderWalletTabsList,
} from '@/assets/data'
import { transactionHistory } from '@/utils/database'
import { TabsContent } from '../ui/tabs'
import TransactionCard from './TransactionCard'
import NoTransactionHistory from './NoTransactionHistory'
import { groupTransactionsByDay } from '@/utils/format'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function WalletTabContent() {
  const groupTransactionByStatusAndDate = (status: string) => {
    const transactionStatus = transactionHistory?.filter(
      (transaction) =>
        transaction?.status?.toLowerCase() === status.toLowerCase(),
    )
    const groupedTransactions = groupTransactionsByDay(transactionStatus)
    const groupedTransactionsArray = Object.entries(groupedTransactions)
    return groupedTransactionsArray
  }
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const tabsList =
    userType == 'customer'
      ? customerWalletTabsList
      : serviceProviderWalletTabsList

  return (
    <>
      {tabsList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-2 md:space-y-4 py-1 ">
            {groupTransactionByStatusAndDate(status)?.map(
              ([day, transaction]) => (
                <div key={day} className="space-y-3 md:space-y-4 ">
                  <h3 className="text-sm md:text-base font-semibold capitalize text-muted-foreground">
                    {day}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 md:gap-4 max-w-xl mx-auto">
                    {transaction.map((transaction, index) => (
                      <TransactionCard key={index} {...transaction} />
                    ))}
                  </div>
                </div>
              ),
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
