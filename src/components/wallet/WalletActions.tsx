import { walletActions } from '@/assets/data'
import { Link } from 'react-router-dom'

export default function WalletActions() {
  return (
    <div className="flex gap-4 items-center justify-evenly">
      {walletActions.map(({ label, icon: Icon, path }) => (
        <Link
          to={path}
          key={label}
          className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-90 group"
        >
          <button className="bg-primary text-white p-3 flex items-center justify-center rounded-full cursor-pointer">
            <Icon className="h-5 w-5 md:w-8.5 md:h-8.5" />
            <span className="sr-only">{label}</span>
          </button>
          <span className="text-sm md:text-lg text-foreground group-hover:text-primary font-medium">
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
