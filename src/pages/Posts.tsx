import PostComposer from '@/components/home/PostComposer'
import PostCard from '../components/home/PostCard'
import { customerPosts } from '../utils/database'

export default function Posts() {
  return (
    <div className="lg:px-4 space-y-4">
      <PostComposer />
      <div className="grid grid-cols-1 gap-4">
        {customerPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  )
}
