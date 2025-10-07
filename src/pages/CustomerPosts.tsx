import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";
import { customerPosts } from "../utils/database";

export default function CustomerPosts() {
  return (
    <div className="w-full flex flex-col items-center justify-start pt-1">
      {/* Composer */}
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] mb-4">
        <PostComposer variant="customer" />
      </div>

      {/* Posts */}
      <div className="w-full flex flex-col items-center gap-4">
        {customerPosts.map((post, idx) => (
          <div key={idx} className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
            <PostCard variant="default" {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}
