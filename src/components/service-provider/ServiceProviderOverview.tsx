import type { ServiceProvider } from '@/utils/types'
import Container from '../global/Container'
import { currencyFormatter } from '@/utils/format'
import { FileText, MapPin, Minus, Star } from 'lucide-react'
import defaultImage from '../../assets/images/profile.jpg'
import HeaderWithBackNavigation from '../header/HeaderWithBackNavigation'

export default function ServiceProviderOverview({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined
}) {
  return (
    <div>
      <HeaderWithBackNavigation title="Profile" />
      <div
        className={` w-full bg-cover bg-center h-[20vh] md:h-[25vh] -mt-2 md:-mt-6`}
        style={{ backgroundImage: `url(${getServiceProvider?.image})` }}
      />
      <Container className="border-b-8 relative">
        <figure className=" -mt-13 md:-mt-18.5  mb-1 md:mb-2 w-max rounded-full border-4 border-background">
          <img
            src={getServiceProvider?.image ?? defaultImage}
            alt={getServiceProvider?.name}
            className="aspect-square object-cover w-24 md:w-34 rounded-full"
          />
        </figure>

        <button className=" block bg-primary px-5 md:px-7 text-white py-1 font-medium rounded-full text-sm md:text-base -mt-12 mb-4 ml-auto">
          Endorse
        </button>
        <div className=" pb-3 md:pb-4 text-start">
          <div className="space-y-0.5">
            <div className="flex items-center gap-4 ">
              <h1 className="font-semibold text-lg md:text-xl">
                {getServiceProvider?.name}
              </h1>
              <span className="text-base md:text-lg capitalize text-primary font-medium block">
                {getServiceProvider?.occupation}
              </span>
            </div>
            <p className=" text-base md:text-lg">{getServiceProvider?.desc}</p>
            <span className="text-primary font-semibold text-sm md:text-base -mt-0.5 block capitalize">
              12 endosers
            </span>
            <p className="flex items-center justify-start gap-1  text-sm md:text-base ">
              From
              <span className="flex items-center gap-0.5">
                <span>{currencyFormatter(getServiceProvider?.minCharge)}</span>
                <Minus className="w-4 h-4" />
                <span>{currencyFormatter(getServiceProvider?.maxCharge)}</span>
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm md:text-base  ">
              <MapPin className="w-4 h-4" />
              {getServiceProvider?.address}
            </p>
            {!getServiceProvider?.averageRating ||
              !getServiceProvider?.totalJobs || (
                <div className="text-xs md:text-sm flex items-center justify-start gap-4 mt-1">
                  {!getServiceProvider?.averageRating || (
                    <span className="flex items-center text-xs gap-1">
                      <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                      {getServiceProvider?.averageRating} (
                      {getServiceProvider?.totalReviews}{' '}
                      {getServiceProvider &&
                      getServiceProvider?.totalReviews > 1
                        ? 'comments'
                        : 'comment'}
                      )
                    </span>
                  )}

                  {!getServiceProvider?.totalJobs || (
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4 md:w-5 md:h-5" />{' '}
                      {getServiceProvider?.totalJobs}{' '}
                      {getServiceProvider && getServiceProvider?.totalJobs > 1
                        ? 'tasks'
                        : 'task'}
                      {}
                    </span>
                  )}
                </div>
              )}
          </div>
        </div>
      </Container>
    </div>
  )
}
