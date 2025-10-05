import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'

export default function SearchBar({
  placeholder,
  maxWidth,
  autoFocus,
}: {
  placeholder: string
  maxWidth: string
  autoFocus?: boolean
}) {
  return (
    <div className={`relative ${maxWidth} mx-auto`}>
      <Input
        type="search"
        className=" pl-8 pr-10 rounded-xl py-5 focus "
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground focus:outline-primary" />
      <SlidersHorizontal className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground focus:outline-primary" />
    </div>
  )
}
