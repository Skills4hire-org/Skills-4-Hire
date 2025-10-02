import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'

export default function SearchBar() {
  return (
    <div className="relative max-w-md mx-auto">
      <Input
        type="text"
        className=" pl-8 pr-10 rounded-xl placeholder:font-medium"
        placeholder="Search for jobs, services or providers"
      />
      <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground focus:outline-primary" />
      <SlidersHorizontal className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground focus:outline-primary" />
    </div>
  )
}
