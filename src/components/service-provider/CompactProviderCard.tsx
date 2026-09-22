import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import { currencyFormatter, formatSpaceToString } from '@/utils/format'
import type { Provider, UserType } from '@/types/user.types'
import type { RootState } from '@/store'
import { Badge } from '../ui/badge'
import AddToFavoriteButton from '../buttons/AddToFavoriteButton'
import defaultImage from '../../assets/images/profile.jpg'
import { compressCloudinaryUrl } from '@/utils/imageTransform'

export default function CompactProviderCard({
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
  const { userType }: { userType: UserType } = useSelector(
    (state: RootState) => state.userState,
  )

  return (
    <div className="relative w-full">
      <div className="flex flex-col bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all">
        <Link
          to={`/${userType}/professionals/${provider_id}`}
          className="block h-20 lg:h-24 bg-slate-200 bg-cover bg-center shrink-0"
          style={{
            backgroundImage: coverImageUrl
              ? `url(${compressCloudinaryUrl(coverImageUrl, 600)})`
              : undefined,
          }}
        />

        <div className="px-3 -mt-6 relative z-10">
          <Link
            to={`/${userType}/professionals/${provider_id}`}
            className="w-12 h-12 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden block"
          >
            <img
              src={
                compressCloudinaryUrl(user?.profile?.avatar?.avatar, 200) ||
                defaultImage
              }
              alt={user?.profile?.display_name || 'Service Provider'}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="px-3 pb-3 flex flex-col gap-1 min-w-0">
          <Link
            to={`/${userType}/professionals/${provider_id}`}
            className="block min-w-0"
          >
            <h3 className="font-bold text-sm text-slate-900 hover:text-primary transition-colors truncate">
              {user?.profile?.display_name}
            </h3>
          </Link>
          <Badge className="capitalize rounded-none font-medium py-0.5 px-1.5 text-[10px] bg-slate-100 text-slate-700 border-0 w-max">
            {formatSpaceToString(professional_title)}
          </Badge>
          <p className="font-normal text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {headline}
          </p>

          <div className="flex items-center justify-between gap-2 mt-1 pt-2 border-t border-slate-100">
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">
                From
              </span>
              <span className="font-extrabold text-sm text-slate-900">
                {currencyFormatter(min_charge)}
              </span>
            </div>
            <div className="flex items-center lg:items-end gap-1.5 shrink-0 lg:flex-col">
              <Link
                to={`/${userType}/professionals/${provider_id}/booking`}
                className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Briefcase className="w-3 h-3" />
                Hire Now
              </Link>
              <AddToFavoriteButton
                id={provider_id}
                isFavourite={isFavourite}
                name={user?.profile?.display_name}
                favouriteID={favouriteID}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}