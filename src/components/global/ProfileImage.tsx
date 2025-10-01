import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function ProfileImage({ size }: { size: 'base' | 'lg' }) {
  return (
    <div className="relative">
      <Avatar className={`${size === 'base' ? 'size-8' : 'size-12'}`}>
        <AvatarImage src="" />
        <AvatarFallback className="">
          <User />
        </AvatarFallback>
      </Avatar>
      <span
        className={`absolute border-3 border-background  ${
          size === 'base' ? 'w-3 h-3' : 'w-4 h-4'
        } w-3 h-3 rounded-full top-0 right-0 bg-green-600`}
      />
    </div>
  )
}
