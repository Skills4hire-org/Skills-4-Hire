import { user } from '@/utils/database'
import { currencyFormatter } from '@/utils/format'

export default function WalletBalance() {
  return (
    <div className="relative text-white text-lg md:text-xl">
      <span className="text-white block">Available Balance:</span>
      <span className="block mt-1 font-medium">
        {currencyFormatter(user?.availableBalance)}
      </span>
    </div>
  )
}
