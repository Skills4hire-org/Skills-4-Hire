import type { ServiceProvider } from '@/utils/types'
import Container from '../global/Container'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'
import { Dot, FileText, MapPin, Star } from 'lucide-react'

export default function ServiceProviderOverview({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined
}) {
  return (
    <div>
      <div
        className={` w-full bg-cover bg-center h-[25vh] md:h-[30vh] lg:h-[35vh]`}
        style={{ backgroundImage: `url(${getServiceProvider?.image})` }}
      />
      <Container className="border-b-8 relative">
        <figure className="bg-blue-200 mx-auto -mt-18 md:-mt-24 mb-2 w-max rounded-lg">
          <img
            src={getServiceProvider?.image}
            alt={getServiceProvider?.name}
            className="aspect-square object-cover w-28 md:w-36 rounded-lg"
          />
        </figure>
        <div className=" pb-3 md:pb-4 text-center">
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Badge className="text-base md:text-lg bg-gray-400 py-1 text-foreground capitalize font-medium">
                {getServiceProvider?.occupation}
              </Badge>
              <p className="flex items-center justify-center gap-4 font-medium text-sm md:text-base">
                <span className="flex items-center gap-1.5">
                  From
                  <span className="text-base md:text-lg">
                    {currencyFormatter(getServiceProvider?.minCharge)}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  To
                  <span className="text-base md:text-lg">
                    {currencyFormatter(getServiceProvider?.maxCharge)}
                  </span>
                </span>
              </p>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1">
              <Badge variant="outline" className="text-sm capitalize py-1">
                <Dot strokeWidth={15} className="text-primary" />
                verified
              </Badge>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <MapPin className="w-6 h-6 shrink-0" />
                {getServiceProvider?.address}
              </p>
            </div>
            <div className="text-xs md:text-sm flex items-center justify-center gap-4">
              <span className="flex items-center text-xs gap-1">
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                {getServiceProvider?.averageRating} Rating (
                {getServiceProvider?.totalReviews}{' '}
                {getServiceProvider && getServiceProvider?.totalReviews > 1
                  ? 'comments'
                  : 'comment'}
                )
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />{' '}
                {getServiceProvider?.totalJobs}{' '}
                {getServiceProvider && getServiceProvider?.totalJobs > 1
                  ? 'tasks'
                  : 'task'}
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
