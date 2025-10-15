import {
  Heart,
  MessageCircle,
  Share2,
  BarChart2,
  Edit2,
  Trash2,
  Zap,
  Calendar,
  Eye,
  MessageSquare,
  Star,
  MapPin,
} from "lucide-react";

type Variant = "default" | "myPosts";

type FeedStats = {
  likes?: number;
  comments?: number;
  shares?: number;
  impressions?: number;
};

interface PostCardProps {
  // FEED props
  profile?: string;
  name?: string;
  location?: string;
  service?: string;
  rating?: string;
  reviews?: string;
  tags?: string[];

  title?: string;
  description: string;

  variant?: Variant;

  posted?: string;
  views?: string;
  inquiries?: string;
  active?: boolean;

  media?: string[];

  stats?: FeedStats;
}

export default function PostCard({
  // feed
  profile,
  name,
  location,
  service,
  rating,
  reviews,
  tags = [],

  // title,
  description,

  variant = "default",

  posted = "Posted today",
  views = "0 views",
  inquiries = "0 enquiries",
  active = false,

  // myposts
  media,

  // feed stats
  stats,
}: PostCardProps) {
  if (variant === "default") {
    const likeCount = stats?.likes ?? 0;
    const commentCount = stats?.comments ?? 0;
    const shareCount = stats?.shares ?? 0;
    const impressionsCount = stats?.impressions ?? 0;

    return (
      <div className="bg-white rounded-2xl shadow p-2.5 md:p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {profile && (
              <img
                src={profile}
                alt={name ?? "profile"}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} /> {location}
                  </span>
                )}
                {rating && (
                  <span className="inline-flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-semibold text-gray-700">
                      {rating}
                    </span>
                    {reviews && (
                      <span className="text-gray-500">({reviews} reviews)</span>
                    )}
                  </span>
                )}
              </div>
              {service && (
                <p className="text-xs text-blue-600 font-medium">{service}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-around md:justify-between pt-2 border-t border-gray-200 text-gray-500 gap-6 md:gap-6">
          <button className="flex items-center gap-1 text-sm hover:text-blue-600">
            <Heart size={18} /> <span className="text-sm">{likeCount}</span>
          </button>

          <button className="flex items-center gap-1 text-sm hover:text-blue-600">
            <MessageCircle size={18} />{" "}
            <span className="text-sm">{commentCount}</span>
          </button>

          <button className="flex items-center gap-1 text-sm hover:text-blue-600">
            <Share2 size={18} /> <span className="text-sm">{shareCount}</span>
          </button>

          <button className="flex items-center gap-1 text-sm hover:text-blue-600">
            <BarChart2 size={18} />{" "}
            <span className="text-sm">{impressionsCount}</span>
          </button>
        </div>
      </div>
    );
  }

  // ===== MY POSTS CARD =====
  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-5 space-y-3">
      <div className="flex items-start justify-between">
        {active && (
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-md">
            Active
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {media && media.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {media.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="post media"
              className="w-full h-32 sm:h-36 object-cover rounded-xl"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {posted}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {views}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} /> {inquiries}
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700">
          <Edit2 size={16} /> Edit
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-1 bg-amber-400 text-gray-900 px-3 py-1.5 rounded-lg text-sm hover:bg-amber-500">
          <Zap size={16} /> Boost
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-1 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
