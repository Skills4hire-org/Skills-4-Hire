import {
  dateFormatter,
  formatSpaceToString,
  timeFormatter,
} from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import Ratings from '../global/Ratings'
import defaultImage from '../../assets/images/profile.jpg'
import { Link, useNavigate } from 'react-router-dom'
import type { Booking } from '@/types/bookings.type'

export default function CustomerBookingCard({
  provider,
  descriptions,
  created_at,
  booking_status,
  booking_id,
  customer,
  price,
}: Booking) {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/customer/bookings/${booking_id}/approve`, {
      state: {
        provider,
        customer,
        price,
      },
    })
  }

  return (
    <div className="space-y-2 md:space-y-4 max-w-xl mx-auto ">
      <div className="flex items-center justify-between gap-8 border-y px-2">
        <div className="flex flex-col gap-1">
          <h3 className="capitalize font-medium ">
            {formatSpaceToString(provider?.professional_title)}
          </h3>
          <div className="text-muted-foreground text-base">
            Date:{' '}
            <span className="text-foreground text-sm">
              {dateFormatter(created_at)}
            </span>
          </div>
          <div className="text-muted-foreground text-base">
            Time:{' '}
            <span className="text-foreground text-sm">
              {timeFormatter(created_at)}
            </span>
          </div>
        </div>
        <Link to={`/customer/professionals/${provider?.provider_id}`}>
          <figure className="w-24 h-24 md:w-30 md:h-30">
            <img
              src={provider?.user?.profile?.avatar?.avatar ?? defaultImage}
              alt={provider?.user?.profile?.display_name}
              className="aspect-square object-cover h-full w-full"
              loading="lazy"
            />
          </figure>
        </Link>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">
          Booking Description
        </h3>
        <p className="text-xs text-muted-foreground">{descriptions}</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base mb-1">
          About Service provider
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/customer/professionals/${provider?.provider_id}`}>
            <ProfileImage
              noStatus
              avatar={provider?.user?.profile?.avatar?.avatar}
            />
          </Link>

          <div className="flex flex-col gap-1.5">
            <Link to={`/customer/professionals/${provider?.provider_id}`}>
              <h4 className="text-xs">
                {provider?.user?.profile?.display_name}
              </h4>
            </Link>

            <Ratings rating={provider?.avg_rating} />
          </div>
        </div>
      </div>
      {booking_status == 'In_progress' && (
        <div className="flex items-center justify-end gap-2 md:gap-4">
          <button
            onClick={handleNavigation}
            className="rounded-md bg-primary hover:opacity-90 py-2 text-white font-medium text-sm md:text--base cursor-pointer w-1/2 text-center"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  )
}
