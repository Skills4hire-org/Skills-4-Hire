import { currencyFormatter } from '@/utils/format'
import referralBonus from '../../assets/images/referral.png'
import { Link } from 'react-router-dom'

export default function ReferAndEarnBanner() {
  return (
    <Link
      to="/customer/referral"
      className="flex items-center border rounded-md py-1 md:py-2 px-3 md:px-5 justify-between gap-4"
    >
      <div className="flex flex-col gap-1 md:gap-1.5">
        <p className="text-lg/5 md:text-xl text-primary font-semibold">
          Refer and earn per referral
        </p>
        <p className="text-xs md:text-sm text-emerald-700">
          Invite and get {currencyFormatter(1000)} per referral
        </p>
      </div>
      <img
        src={referralBonus}
        alt="refer and earn"
        className="aspect-square"
        width={67}
        height={66}
      />
    </Link>
  )
}
