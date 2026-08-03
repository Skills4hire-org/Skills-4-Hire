import { Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'
import defaultImage from '../../assets/images/profile.jpg'
import { Link } from 'react-router-dom'
import AddToFavoriteButton from '../buttons/AddToFavoriteButton'
import type { Provider } from '@/types/user.types'

export default function ServiceProviderCard({
  provider_id,
  user,
  professional_title,
  avg_rating,
  total_reviews,
  providerIDs,
  favouriteID,
  min_charge,
  headline,
}: Provider) {
  const isFavourite = providerIDs?.includes(provider_id)

  return (
    <div className="rounded-none flex flex-col sm:flex-row bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all w-full">
      {/* Top section on mobile, Left section on desktop */}
      <div className="relative flex shrink-0 w-full sm:w-28 md:w-36 h-48 sm:h-auto bg-slate-100">
        <Link
          to={`/customer/professionals/${provider_id}`}
          className="w-full h-full block"
        >
          <figure className="h-full w-full m-0">
            <img
              src={user?.profile?.avatar?.avatar ?? defaultImage}
              alt={user?.profile?.display_name || 'Service Provider'}
              className="w-full h-full object-cover rounded-none"
              loading="lazy"
            />
          </figure>
        </Link>

        {/* Floating Favorite Button on Mobile View Only */}
        <div className="absolute top-3 right-3 sm:hidden bg-white/90 backdrop-blur-sm p-1.5 shadow-sm border border-slate-100">
          <AddToFavoriteButton
            id={provider_id}
            isFavourite={isFavourite}
            name={user?.profile?.display_name}
            favouriteID={favouriteID}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col sm:flex-row items-stretch justify-between p-4 md:p-5 gap-4">
        {/* Info Area */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <Link
                to={`/customer/professionals/${provider_id}`}
                className="block min-w-0"
              >
                <h3 className="font-bold text-base md:text-lg text-slate-900 hover:text-primary transition-colors truncate">
                  {user?.profile?.display_name}
                </h3>
              </Link>

              {/* Star Rating on Mobile sits next to Name */}
              <div className="flex sm:hidden items-center gap-1 bg-amber-50 py-0.5 px-2 border border-amber-200/60 rounded-none shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-800">
                  {avg_rating}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({total_reviews})
                </span>
              </div>
            </div>

            <div>
              <Badge className="capitalize rounded-none font-medium py-0.5 px-2 text-[10px] md:text-[11px] bg-slate-100 text-slate-700 border-0 inline-block">
                {professional_title}
              </Badge>
            </div>
          </div>

          <Link
            to={`/customer/professionals/${provider_id}`}
            className="block my-3 sm:my-2"
          >
            <p className="font-normal text-xs md:text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {headline}
            </p>
          </Link>
        </div>

        {/* Right side actions panel (Desktop exclusive layout) */}
        <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end shrink-0 pt-3 sm:pt-0 sm:pl-4 sm:border-l border-t sm:border-t-0 border-slate-100 gap-2">
          {/* Star Rating (Hidden on mobile, visible on desktop) */}
          <div className="hidden sm:flex items-center gap-1 bg-amber-50 py-0.5 px-1.5 border border-amber-200/60 rounded-none">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs md:text-sm font-bold text-slate-800">
              {avg_rating}
            </span>
            <span className="text-[10px] text-slate-400">
              ({total_reviews})
            </span>
          </div>

          {/* Favorite Button (Hidden on mobile, visible on desktop) */}
          <div className="hidden sm:block my-auto py-1">
            <AddToFavoriteButton
              id={provider_id}
              isFavourite={isFavourite}
              name={user?.profile?.display_name}
              favouriteID={favouriteID}
            />
          </div>

          {/* Pricing Box - Stays clean on all screen layouts */}
          <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end gap-1 sm:gap-0 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              From
            </span>
            <span className="font-extrabold text-sm md:text-base text-slate-900">
              {currencyFormatter(min_charge)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
