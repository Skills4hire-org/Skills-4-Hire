import type { Endorser } from '@/types/endorse.types'
import ProfileImage from '../global/ProfileImage'

export default function EndorserCard({ endorsed_by, message }: Endorser) {
  return (
    <div className="rounded-md shadow-sm">
      <div className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-t-md">
        <ProfileImage
          noStatus
          size="size-8"
          avatar={endorsed_by?.profile?.avatar?.avatar}
        />
        <h3 className="font-semibold text-base md:text-lg">
          {endorsed_by?.profile?.display_name}
        </h3>
      </div>
      <p className="text-sm md:text-base p-2 bg-gray-100">{message}</p>
    </div>
  )
}
