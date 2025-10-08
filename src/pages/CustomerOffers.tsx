import { customerOffers } from '../utils/database'
import OfferCard from '@/components/home/OfferCard'

export default function CustomerOffers() {
  return (
    <div
      className="
        grid grid-cols-1 
        lg:px-4
        space-y-4
      "
    >
      {customerOffers.map((offer, idx) => (
        <OfferCard key={idx} {...offer} />
      ))}
    </div>
  )
}
