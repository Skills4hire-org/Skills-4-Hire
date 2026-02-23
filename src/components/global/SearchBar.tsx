import { Search } from 'lucide-react'
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
    <form className={`relative ${maxWidth} mx-auto`}>
      <Input
        type="text"
        className={` pl-3 pr-10 rounded-md border h-8 md:h-9 text-xs md:text-sm`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        name="searchQuery"
        id="searchQuery"
        required
      />
      <button
        type="submit"
        className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
      >
        <Search className="w-4.5 h-4.5" />
      </button>
    </form>
  )
}
