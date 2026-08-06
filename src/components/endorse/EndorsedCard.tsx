import type { Endorser } from '@/types/endorse.types'
import ProfileImage from '../global/ProfileImage'
import { formatSpaceToString } from '@/utils/format'

export default function EndorsedCard({ provider, message }: Endorser) {
  return (
    <div className="rounded-md shadow-sm">
      <div className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-t-md">
        <ProfileImage
          noStatus
          size="size-9"
          avatar={provider?.user?.profile?.avatar?.avatar}
        />
        <div className="-space-y-1.5">
          <h3 className="font-semibold text-base md:text-lg">
            {provider?.user?.profile?.display_name}
          </h3>
          <span className="text-xs md:text-sm font-medium text-primary capitalize">
            {formatSpaceToString(provider?.professional_title)}
          </span>
        </div>
      </div>
      <p className="text-sm md:text-base p-2 bg-gray-100">{message}</p>
    </div>
  )
}
