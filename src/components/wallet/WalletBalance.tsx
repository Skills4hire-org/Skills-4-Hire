import { user } from '@/utils/database'
import { currencyFormatter } from '@/utils/format'
import { Link } from 'react-router-dom'

export default function WalletBalance() {
  return (
    <div className="relative text-white text-base md:text-lg bg-primary rounded-md md:rounded-lg py-4 md:py-6 md:px-4 px-2 flex items-start justify-between">
      <div>
        <span className="text-white block">Available Balance</span>
        <span className="block mt-1 font-medium">
          {currencyFormatter(user?.availableBalance)}
        </span>
      </div>

      <Link
        to="transaction-history"
        className="text-xs md:text-sm hover:text-gray-200 py-1"
      >
        Transaction History
      </Link>
    </div>
  )
}
