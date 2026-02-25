import { ArrowUp, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function WalletActions() {
  return (
    <div className="flex items-center gap-2 md:gap-6 justify-center">
      <button className="rounded-full bg-white text-primary py-1.5 font-medium px-4 text-xs md:text-base flex items-center gap-1.5 cursor-pointer hover:text-primary/80">
        <Plus className="w-3 h-3 md:w-4 md:h-4" /> Deposit
      </button>
      <Link
        to="withdraw"
        className="rounded-full bg-white/40 text-primary py-1.5 font-medium px-4 text-xs md:text-base flex items-center gap-1.5 text-white hover:text-white/90"
      >
        <ArrowUp className="w-3 h-3 md:w-4 md:h-4" /> Withdraw
      </Link>
    </div>
  )
}
