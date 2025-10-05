import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function ProfileImage({ noStatus }: { noStatus?: boolean }) {
  return (
    <div className="relative w-max">
      <Avatar className="size-12">
        <AvatarImage src="" />
        <AvatarFallback>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      {noStatus || (
        <span
          className="absolute border-2 border-background w-3 h-3
        rounded-full top-0 right-0 bg-green-600"
        />
      )}
    </div>
  )
}
