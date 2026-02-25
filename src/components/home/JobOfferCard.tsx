import ProfileImage from '@/components/global/ProfileImage'
import { MapPin, Clock, Wallet, RefreshCw, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import OfferImageCarousel from './OfferImageCarousel'
import OfferFilesCarousel from './OfferFilesCarousel'

interface JobOffer {
  id: number | string
  name: string
  role?: string
  location?: string
  title: string
  description?: string
  budget?: string
  deadline?: string
  distanceKm?: number
  images?: string[]
}

export default function JobOfferCard({
  name,
  location,
  title,
  description,
  budget,
  deadline,
  distanceKm,
  images = [],
}: JobOffer) {
  const [viewMore, setViewMore] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 md:space-y-3 w-full">
      <p className="text-sm md:text-base font-medium text-gray-600">
        Posted 34 minutes ago
      </p>
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          <ProfileImage noStatus size="size-10 md:size-12" />
        </div>

        <div className="space-y-0.5">
          <p className="text-base md:text-lg font-semibold text-gray-900 leading-tight ">
            {name}
          </p>
          {location && (
            <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-0.5">
          {title}
        </h3>
        {description && (
          <div>
            <p
              className={`text-base md:text-lg text-gray-600 ${!viewMore && 'line-clamp-2 sm:line-clamp-none'}`}
            >
              {description}
            </p>
            <button
              onClick={() => setViewMore(!viewMore)}
              className="text-xs md:text-sm text-primary underline cursor-pointer hover:no-underline sm:hidden"
            >
              {viewMore ? 'less' : 'more'}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
        {typeof distanceKm !== 'undefined' && (
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-green-50 text-green-700 whitespace-nowrap">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>
              Ibadan, <span className="uppercase">oyo</span>
            </span>
          </span>
        )}

        {deadline && (
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-yellow-50 text-yellow-800 whitespace-nowrap">
            <Clock className="w-4 h-4 shrink-0" />
            <span>2 days</span>
          </span>
        )}

        {budget && (
          <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-blue-50 text-blue-700 whitespace-nowrap">
            <Wallet className="w-4 h-4 shrink-0" />
            <span>{budget}</span>
          </span>
        )}
      </div>
      <div className="my-6">
        {images && <OfferImageCarousel images={images} />}
      </div>
      <div>
        <OfferFilesCarousel />
      </div>

      <div className="mt-2">
        <div className="flex gap-2 flex-nowrap">
          <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md bg-yellow-400 text-white text-sm md:text-base hover:opacity-90 transition font-medium ">
            <RefreshCw className="w-4 h-4" />
            <span>Negotiate</span>
          </button>
          <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition font-medium">
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  )
}
