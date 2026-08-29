import { currencyFormatter } from '@/utils/format'
import type { Transaction } from '@/types/wallet.types'

export default function TransactionCard({
  type,
  amount,
  transaction_id,
}: Transaction) {
  return (
    <div className="bg-white shadow-sm rounded-md p-2 flex items-center justify-between gap-6 max-w-5xl mx-auto w-full">
      <div className="space-y-1 md:space-y-2">
        <p className="text-xs md:text-sm">
          <span className="text-gray-500">Transaction ID:</span>{' '}
          {transaction_id}
        </p>
        <p className="text-xs md:text-sm capitalize">
          <span className="text-gray-500">Type:</span> {type.toLowerCase()}
        </p>
      </div>

      <span className="block text-base md:text-lg font-medium">
        {currencyFormatter(Number(amount))}
      </span>
    </div>
  )
}
