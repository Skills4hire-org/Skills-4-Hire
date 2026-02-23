import JobOfferCard from '@/components/home/JobOfferCard'
import { jobOffers } from '@/assets/data'
import { Sliders, ChevronDown } from 'lucide-react'

export default function JobOffers() {
  return (
    <div className="lg:px-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-sm md:text-base text-gray-900">
            Recent Job Offers
          </h2>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-xs md:text-sm shadow-sm hover:bg-gray-50">
              <Sliders className="w-4 h-4" />
              Filter
            </button>

            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-xs md:text-sm shadow-sm hover:bg-gray-50">
              Sort <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {jobOffers.map((offer) => (
            <JobOfferCard key={offer.id} {...offer} />
          ))}
        </div>
      </div>
    </div>
  )
}
