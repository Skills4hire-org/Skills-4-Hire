import { Link } from 'react-router-dom'

export default function FollowCounts() {
  return (
    <section
      aria-label="Followership"
      className="grid grid-cols-2 gap-3 border-b-8 bg-white px-4 py-4 md:gap-4 md:px-8"
    >
      <Link
        to="/professional/network?list=followers"
        className="flex aspect-square max-h-32 flex-col justify-center rounded-lg bg-gray-100 px-4 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="text-3xl font-bold text-gray-950">—</span>
        <span className="mt-1 text-sm text-gray-600">Followers</span>
      </Link>
      <Link
        to="/professional/network?list=following"
        className="flex aspect-square max-h-32 flex-col justify-center rounded-lg bg-gray-100 px-4 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="text-3xl font-bold text-gray-950">—</span>
        <span className="mt-1 text-sm text-gray-600">Following</span>
      </Link>
    </section>
  )
}