import { dateFormatter, timeFormatter } from '@/utils/format'
import type { CustomerBooking } from '@/utils/types'
import ProfileImage from '../global/ProfileImage'
import Ratings from '../global/Ratings'
import RequestACallButton from '../buttons/RequestACallButton'
import SMSButton from '../buttons/SMSButton'

export default function CustomerBookingCard({
  service,
  serviceImage,
  createdAt,
  serviceProviderName,
  serviceProviderRating,
  desc,
}: CustomerBooking) {
  return (
    <div className="space-y-2 md:space-y-4 max-w-4xl mx-auto ">
      <div className="flex items-center justify-between gap-8 border-y px-2">
        <div className="flex flex-col gap-1">
          <h3 className="capitalize font-medium ">{service}</h3>
          <div className="text-muted-foreground text-base">
            Date:{' '}
            <span className="text-foreground text-sm">
              {dateFormatter(createdAt)}
            </span>
          </div>
          <div className="text-muted-foreground text-base">
            Time:{' '}
            <span className="text-foreground text-sm">
              {timeFormatter(createdAt)}
            </span>
          </div>
        </div>
        <figure>
          <img
            src={serviceImage}
            alt={service}
            className="aspect-square object-cover h-full max-w-24 md:max-w-42"
            loading="lazy"
          />
        </figure>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">
          Booking Description
        </h3>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base mb-1">
          About Service provider
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <ProfileImage noStatus />
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs">{serviceProviderName}</h4>
            <Ratings rating={serviceProviderRating} />
          </div>
        </div>
        <div className="flex flex-wrap gap-16">
          <RequestACallButton />
          <SMSButton />
        </div>
      </div>
    </div>
  )
}
