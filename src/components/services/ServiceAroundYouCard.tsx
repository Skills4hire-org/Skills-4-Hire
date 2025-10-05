import { Heart, Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'

interface ServiceAroundYouCardProp {
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
}

export default function ServiceAroundYouCard({
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
}: ServiceAroundYouCardProp) {
  return (
    <div className="rounded-r-md flex bg-white shadow-md">
      <figure className="rounded-tr-4xl ">
        <img
          src={image}
          alt={occupation}
          className="max-w-32 sm:max-w-42 h-full object-cover rounded-tr-4xl"
        />
      </figure>
      <div className="flex flex-1 flex-col sm:flex-row gap-2  justify-between p-4 sm:px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-lg">{name}</h3>
            {online && <div className="w-3 h-3 rounded-full bg-green-600" />}
          </div>
          <div className="flex items-center gap-3">
            <Badge className="capitalize rounded-full font-normal py-1 px-4 text-sm">
              {occupation}
            </Badge>
            {verified && (
              <span className="text-primary italic text-xs">Verified</span>
            )}
          </div>
          <div>
            <p className="font-medium text-sm line-clamp-2">{desc}</p>
            <p className="text-xs text-primary font-medium">{features}</p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col flex-wrap justify-between gap-2 items-center w-full sm:w-max">
          <div className="flex items-center gap-1 font-medium sm:mt-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 fill-yellow-600 text-yellow-600" />
              <span className="text-xs">{averageRating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({totalReviews})
            </span>
          </div>
          <Heart className="w-6 h-6" />
          <div className="capitalize text-sm text-muted-foreground">
            from
            <span className="font-medium text-foreground ml-1">
              {currencyFormatter(minCharge)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
