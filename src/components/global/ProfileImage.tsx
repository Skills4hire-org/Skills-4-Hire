import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function ProfileImage({ size }: { size: 'base' | 'lg' }) {
  return (
    <div className="relative w-max">
      <Avatar className={`${size === 'base' ? 'size-8' : 'size-12'}`}>
        <AvatarImage src="" />
        <AvatarFallback>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <span
        className={`absolute border-2 border-background  ${
          size === 'base' ? 'w-2 h-2' : 'w-3 h-3'
        } rounded-full top-0 right-0 bg-green-600`}
      />
    </div>
  )
}
