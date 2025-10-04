import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";
import { customerPosts } from "../utils/database";

export default function CustomerPosts() {
  return (
    <>
      <div className="mb-4">
        <PostComposer variant="customer" />
      </div>

      {customerPosts.map((post, idx) => (
        <div key={idx} className="mb-4">
          <PostCard variant="default" {...post} />
        </div>
      ))}
    </>
  );
}
