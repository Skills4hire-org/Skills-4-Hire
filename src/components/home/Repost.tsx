import { useRepost, useUnrepost } from '@/hooks/usePosts'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from '../ui/dropdown-menu'
import { Repeat, Users } from 'lucide-react'
import RepostDialog from './RepostDialog'
import { useState } from 'react'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

export default function Repost({
  post_id,
  is_reposted,
  reposts_count,
  queryKey,
}: {
  post_id?: string
  reposts_count?: number
  is_reposted?: boolean
  queryKey: string[]
}) {
  const [open, setOpen] = useState(false)
  const { mutate: repost, isPending: reposting } = useRepost(queryKey)
  const { mutate: unrepost, isPending: unreposting } = useUnrepost(queryKey)

  const handleRepost = () => {
    is_reposted ? unrepost({ post_id }) : repost({ post_id })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${
              is_reposted ? 'text-green-600' : ''
            }`}
          >
            <Repeat className="w-5 h-5 md:h-6 md:w-6" />
            <span>{reposts_count}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          sideOffset={4}
          className="bg-gray-100 py-2 px-1 rounded-md z-50"
        >
          <DropdownMenuItem
            onClick={handleRepost}
            className="text-gray-800"
            asChild
            disabled={reposting || unreposting}
          >
            <button className="cursor-pointer group focus:bg-transparent">
              <Repeat className="w-4 h-4 md:w-5 md:h-5  group-hover:text-foreground" />
              <span className="capitalize text-xs md:text-sm flex items-center justify-between group-hover:text-foreground flex-1">
                {is_reposted ? 'Unrepost' : 'Repost'}
              </span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-800" asChild>
            <button
              className="cursor-pointer group focus:bg-transparent flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Users className="w-4 h-4 md:w-5 md:h-5  group-hover:text-foreground" />
              <span className=" text-xs md:text-sm flex items-center justify-between group-hover:text-foreground flex-1">
                Reposted by
              </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RepostDialog open={open} onOpenChange={setOpen} post_id={post_id} />
    </>
  )
}
