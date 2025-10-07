import { user } from '@/utils/database'
import { currencyFormatter } from '@/utils/format'

export default function WalletBalance() {
  return (
    <div className="relative text-white/90 text-lg md:text-2xl">
      <span className="text-white/90 block">Available Balance:</span>
      <span className="block mt-1 font-medium">
        {currencyFormatter(user?.availableBalance)}
      </span>
    </div>
  )
}
