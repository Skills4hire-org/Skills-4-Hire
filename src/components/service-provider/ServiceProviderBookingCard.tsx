import { Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'
import { Link } from 'react-router-dom'

interface ServiceProviderCardProp {
  id: number
  name: string
  online: boolean
  occupation: string
  verified: boolean
  desc: string
  features: string
  minCharge: number
  averageRating: number
  totalReviews: number
  image: string
  favorite: boolean
}

export default function ServiceProviderBookingCard({
  id,
  name,
  online,
  occupation,
  verified,
  desc,
  features,
  minCharge,
  averageRating,
  totalReviews,
  image,
}: ServiceProviderCardProp) {
  return (
    <div className="rounded-r-md flex bg-white shadow-md">
      <Link to={`/customer/service-provider/${id}`}>
        <figure className="rounded-tr-4xl h-full ">
          <img
            src={image}
            alt={occupation}
            className="max-w-24 md:max-w-42 h-full object-cover rounded-tr-4xl"
            loading="lazy"
          />
        </figure>
      </Link>
      <div className="flex flex-1 flex-row gap-2 items-center justify-between p-2 md:p-4">
        <div className="space-y-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2">
            <h3 className="font-semibold text-sm md:text-lg">{name}</h3>
            {online && (
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-600" />
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Badge className="capitalize rounded-full font-normal py-0 px-2 md:py-1 md:px-4 text-xs md:text-sm">
              {occupation}
            </Badge>
            {verified && (
              <span className="text-primary italic text-xs md:text-sm">
                Verified
              </span>
            )}
          </div>
          <div className="space-y-1">
            <p className="font-medium text-xs md:text-sm line-clamp-2">
              {desc}
            </p>
            <p className="text-xs text-primary font-medium">{features}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 items-center h-full">
          <div className="flex items-center gap-1 font-medium sm:mt-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 md:w-6 md:h-6 h-4 fill-yellow-600 text-yellow-600" />
              <span className="text-xs md:text-sm">{averageRating}</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              ({totalReviews})
            </span>
          </div>
          <div className="capitalize text-xs md:text-sm text-muted-foreground">
            from
            <span className="font-medium text-foreground ml-1">
              {currencyFormatter(minCharge)}
            </span>
          </div>
          <div />
        </div>
      </div>
    </div>
  )
}
