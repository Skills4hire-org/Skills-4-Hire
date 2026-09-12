import { currencyFormatter } from '@/utils/format'
import type { Transaction } from '@/types/wallet.types'

export default function TransactionCard({
  type,
  amount,
  transaction_id,
  status,
}: Transaction) {
  const getStatus: Record<string, string> = {
    PENDING: 'text-gray-600 bg-gray-100',
    PROCESSING: 'text-yellow-600 bg-yellow-100',
    COMPLETED: 'text-green-600 bg-green-100',
    FAILED: 'text-red-600 bg-red-100',
  }

  const statusStyle = getStatus[status]

  return (
    <div className="bg-white shadow-sm rounded-md p-2 flex items-center justify-between gap-6 max-w-5xl mx-auto w-full">
      <div className="space-y-1 md:space-y-2">
        <p className="text-xs md:text-sm">
          <span className="text-gray-500">Transaction ID:</span>{' '}
          {transaction_id}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm capitalize">
            <span className="text-gray-500">Type:</span> {type.toLowerCase()}
          </span>
          <span
            className={`text-xs md:text-sm capitalize p-1 rounded-sm ${statusStyle}`}
          >
            {status.toUpperCase()}
          </span>
        </div>
      </div>
      <span className="block text-base md:text-lg font-medium">
        {currencyFormatter(Number(amount))}
      </span>
    </div>
  )
}
