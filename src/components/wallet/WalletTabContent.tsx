import {
  customerWalletTabsList,
  serviceProviderWalletTabsList,
} from '@/assets/data'
import { TabsContent } from '../ui/tabs'
import TransactionCard from './TransactionCard'
import NoTransactionHistory from './NoTransactionHistory'
import { groupTransactionsByDay } from '@/utils/format'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import type { Transaction } from '@/types/wallet.types'

export default function WalletTabContent({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const groupedTransactions = groupTransactionsByDay(transactions)
  const groupedTransactionsArray = Object.entries(groupedTransactions)

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
            {groupedTransactionsArray?.map(([day, transaction]) => (
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
            ))}

            {groupedTransactionsArray?.length == 0 && (
              <NoTransactionHistory label={label} />
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
