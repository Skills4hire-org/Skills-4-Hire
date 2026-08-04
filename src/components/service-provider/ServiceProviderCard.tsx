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
  providerIDs,
  favouriteID,
  min_charge,
  headline,
}: Provider) {
  const isFavourite = providerIDs?.includes(provider_id)
  const coverImageUrl = user?.profile?.cover_photo?.image_url

  return (
    <div className="rounded-none flex flex-col lg:flex-row bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all w-full relative">
      
      {/* Absolute Favorite Button pinned at the top right corner */}
      <div className="absolute top-35 lg:top-3 md:top-3 right-4 lg:right-3 md:right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 border border-slate-100 shadow-sm">
        <AddToFavoriteButton
          id={provider_id}
          isFavourite={isFavourite}
          name={user?.profile?.display_name}
          favouriteID={favouriteID}
        />
      </div>

      {/* Cover Photo Header: Top on mobile/tablet, Left side on laptop */}
      <Link 
        to={`/customer/professionals/${provider_id}`} 
        className="block w-full lg:w-48 h-24 lg:h-auto bg-slate-100 bg-cover bg-center shrink-0"
        style={{
          backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : undefined,
        }}
      />

      {/* Card Content Elements */}
      <div className="p-4 pt-0 lg:pt-4 flex flex-col lg:flex-row flex-1 relative lg:items-center lg:justify-between lg:gap-4">
        
        {/* Profile Avatar and Left Content Wrapper */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-1 min-w-0">
          
          {/* Rounded profile avatar image: Overlaps cover on mobile, stands clean on laptop */}
          <div className="-mt-10 lg:-mt-0 shrink-0 z-0">
            <Link 
              to={`/customer/professionals/${provider_id}`} 
              className="w-20 h-20 rounded-full border-4 border-white lg:border-2 lg:border-slate-100 bg-white shadow-sm overflow-hidden block"
            >
              <img
                src={user?.profile?.avatar?.avatar ?? defaultImage}
                alt={user?.profile?.display_name || 'Service Provider'}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Informational Text Stack */}
          <div className="flex flex-col min-w-0 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <Link to={`/customer/professionals/${provider_id}`} className="inline-block min-w-0">
                <h3 className="font-bold text-base text-slate-900 hover:text-primary transition-colors truncate">
                  {user?.profile?.display_name}
                </h3>
              </Link>

              <div>
                <Badge className="capitalize rounded-none font-medium py-0.5 px-2 text-[10px] bg-slate-100 text-slate-700 border-0 inline-block">
                  {professional_title}
                </Badge>
              </div>
            </div>

            <Link to={`/customer/professionals/${provider_id}`} className="block">
              <p className="font-normal text-xs md:text-sm text-slate-500 line-clamp-2 lg:line-clamp-1 leading-relaxed">
                {headline}
              </p>
            </Link>
          </div>
        </div>

        {/* Pricing Area: Bottom-right corner layout on laptop */}
        <div className="text-right border-slate-100 lg:border-0 lg:mt-12 shrink-0 flex items-center justify-between lg:block">
          <span className="text-[10px] text-slate-700 uppercase tracking-wider block font-medium lg:mb-0.5 max-[768px]:min-[0px]:absolute max-[768px]:min-[0px]:right-15 max-[768px]:min-[0px]:-top-8">From</span>
          <span className="font-extrabold text-sm md:text-base text-slate-900 bg-slate-50 lg:bg-transparent px-3 lg:px-0 py-1.5 lg:py-0 border border-slate-200 lg:border-0 block min-w-[80px] text-center lg:text-right max-[768px]:min-[0px]:absolute max-[768px]:min-[0px]:right-3 max-[768px]:min-[0px]:-top-4">
            {currencyFormatter(min_charge)}
          </span>
        </div>

      </div>
    </div>
  )
}
