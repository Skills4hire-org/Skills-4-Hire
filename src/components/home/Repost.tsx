import { useRepost, useUnrepost } from '@/hooks/usePosts'
import { Repeat } from 'lucide-react'

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
  const { mutate: repost, isPending: reposting } = useRepost(queryKey)
  const { mutate: unrepost, isPending: unreposting } = useUnrepost(queryKey)
  const handleRepost = () => {
    is_reposted ? unrepost({ post_id }) : repost({ post_id })
  }

  return (
    <button
      type="button"
      onClick={handleRepost}
      disabled={reposting || unreposting}
      className={`flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition cursor-pointer ${
        is_reposted ? 'text-green-600' : ''
      }`}
    >
      <Repeat className="w-5 h-5 md:h-6 md:w-6" />
      <span>{reposts_count}</span>
      <span className="sr-only">repost</span>
    </button>
  )
}
