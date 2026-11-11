import { Link } from 'react-router-dom'
import { Briefcase, MapPin } from 'lucide-react'
import ProfileImage from '@/components/global/ProfileImage'
import AddToFavoriteButton from '@/components/buttons/AddToFavoriteButton'
import type { Provider } from '@/types/user.types'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'

export default function NetworkProfessionalCard({
  provider,
  providerIDs,
  favouriteID,
}: {
  provider: Provider
  providerIDs?: string[]
  favouriteID?: string
}) {
  const { provider_id, user, professional_title, headline } = provider
  const { userType }: { userType: UserType } = useSelector((state: any) => state.userState)
  const basePath = userType === 'customer' ? '/customer' : '/professional'
  const name = user?.profile?.display_name || 'Professional'
  const location = [user?.profile?.city, user?.profile?.state]
    .filter(Boolean)
    .join(', ')

  return (
    <article className="flex items-center gap-3 border-b border-gray-100 py-4 last:border-0">
      <Link to={`${basePath}/professionals/${provider_id}`} aria-label={`View ${name}'s profile`} className="shrink-0">
        <ProfileImage noStatus size="size-14" avatar={user?.profile?.avatar?.avatar} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link to={`${basePath}/professionals/${provider_id}`} className="font-semibold text-gray-950 hover:text-primary">{name}</Link>
        <p className="text-sm text-gray-600">{professional_title}</p>
        {headline && <p className="line-clamp-1 text-sm text-gray-600">{headline}</p>}
        {location && <p className="flex items-center gap-1 text-sm text-gray-600"><MapPin className="size-3.5" />{location}</p>}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <button type="button" disabled title="Follow actions are not available until the follow API is enabled" className="rounded-full border border-primary px-3 py-1.5 text-sm font-semibold text-primary opacity-60 disabled:cursor-not-allowed">+ Follow</button>
        {userType === 'customer' && <Link to={`${basePath}/professionals/${provider_id}/booking`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><Briefcase className="size-3.5" />Hire Now</Link>}
        {userType === 'customer' && <div className="rounded-full border border-gray-100 bg-white p-1"><AddToFavoriteButton id={provider_id} isFavourite={providerIDs?.includes(provider_id)} name={name} favouriteID={favouriteID} /></div>}
      </div>
    </article>
  )
}
