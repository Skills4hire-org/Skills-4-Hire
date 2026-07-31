import { currencyFormatter, dateFormatter } from '@/utils/format'
import { Button } from '../ui/button'
import type { Post } from '@/types/post.types'

interface RequestCardProp {
  post: Post
}

export default function RequestCard({ post }: RequestCardProp) {
  const name = post.user?.profile?.display_name || `${post.user?.first_name ?? ''} ${post.user?.last_name ?? ''}`.trim() || 'Customer'
  const avatar = post.user?.profile?.avatar?.avatar
  const status = post.post_status || 'Pending'
  const service = post.tags?.[0]?.name
  const price = Number(post.amount) || 0
  const address = [post.city, post.state].filter(Boolean).join(', ') || 'Location not set'

  const statusColor = (status: string) =>
    status === 'Pending' ? 'bg-red-500' : 'bg-primary'
  return (
    <div className="rounded-md shadow-md border border-gray-200 overflow-hidden bg-white">
      <div className="px-2 md:px-3 md:py-6 py-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
              {name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex flex-col flex-1">
            <span
              className={`${statusColor(
                status
              )} text-white text-xs px-3 py-1 rounded-full w-fit`}
            >
              {status}
            </span>

            {service && (
              <p className="mt-1 text-gray-600 italic text-sm">{service}</p>
            )}

            <span className="text-gray-900 font-medium mt-1">
              {currencyFormatter(price)}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl text-sm text-gray-700">
          <h2 className="mt-1 font-medium text-gray-700">{name}</h2>
          <p className="font-medium">{address}</p>
          {post.created_at && (
            <p className="mt-1 text-gray-500">
              <span>{dateFormatter(post.created_at)}</span>
            </p>
          )}
        </div>

        {status === 'Pending' && (
          <div className="flex items-center justify-between gap-3 mt-2">
            <Button className="flex-1 bg-primary text-white rounded-full py-2">
              Accept
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-gray-400 text-gray-700 rounded-full py-2"
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
