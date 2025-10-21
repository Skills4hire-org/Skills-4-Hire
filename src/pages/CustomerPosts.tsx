import CustomerPostComposer from '@/components/home/CustomerPostComposer'
import PostCard from '../components/home/PostCard'
import { customerPosts } from '../utils/database'

export default function CustomerPosts() {
  return (
    <div className="lg:px-4 space-y-4">
      <CustomerPostComposer />
      <div className="grid grid-cols-1 gap-4">
        {customerPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  )
}
