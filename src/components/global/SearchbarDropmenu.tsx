import { Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import SearchBar from './SearchBar'

export default function SearchbarDropmenu({
  placeholder,
  position,
}: {
  placeholder: string
  position: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Search className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={8}
        className={` p-0.5 border-none outline-none w-[77vw] max-w-md shadow-none ${position}`}
      >
        <SearchBar placeholder={placeholder} maxWidth="w-full " />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
