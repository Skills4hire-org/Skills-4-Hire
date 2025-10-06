import { walletActions } from '@/assets/data'
import { Button } from '../ui/button'

export default function WalletActions() {
  return (
    <div className="flex gap-8 items-center justify-center">
      {walletActions.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-0.5 hover:opacity-90"
        >
          <Button size="icon" className=" rounded-full">
            <Icon size={22} />
            <span className="sr-only">{label}</span>
          </Button>
          <span className="text-sm text-white">{label}</span>
        </div>
      ))}
    </div>
  )
}
