import { user } from '@/utils/database'
import { currencyFormatter } from '@/utils/format'

export default function WalletBalance() {
  return (
    <div className="relative text-white/90 mb-4 md:mt-10">
      <span className="text-base text-white/90 block">Available Balance:</span>
      <span className="text-sm block mt-1">
        {currencyFormatter(user?.availableBalance)}
      </span>
    </div>
  )
}
