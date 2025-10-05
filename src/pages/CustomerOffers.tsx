import OfferCard from '@/components/home/OfferCard'
import { customerOffers } from '../utils/database'

export default function CustomerOffers() {
  return (
    <div className="space-y-6">
      {customerOffers.map((offer, idx) => (
        <OfferCard key={idx} {...offer} />
      ))}
    </div>
  )
}
