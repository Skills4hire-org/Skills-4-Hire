import { user } from '@/utils/database'
import { currencyFormatter } from '@/utils/format'
import { ChevronRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import WalletActions from './WalletActions'

export default function WalletBalance() {
  return (
    <div className="text-white text-base md:text-lg bg-primary rounded-md md:rounded-lg py-4 md:py-6 md:px-4 px-2 space-y-6">
      <div className="  flex items-start justify-between">
        <div>
          <span className="text-white/80 block">Available Balance</span>
          <span className="block mt-1 font-medium">
            {currencyFormatter(user?.availableBalance)}
          </span>
          <div className="block text-xs md:text-sm flex items-center gap-0.5 mt-1 text-white/80">
            <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>
              Locked: <span>{currencyFormatter(20000)}</span>
            </span>
          </div>
        </div>

        <Link
          to="transaction-history"
          className="text-xs md:text-sm hover:text-white py-1 flex items-center gap-0.5 text-white/80"
        >
          Transaction History
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5" />
        </Link>
      </div>
      <WalletActions />
    </div>
  )
}
