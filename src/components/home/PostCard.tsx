import type { PostCard } from "@/utils/types";
import {
  Heart,
  MessageCircle,
  Share2,
  BarChart2,
  Star,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileImage from "@/components/global/ProfileImage";

export default function PostCard({
  id,
  name,
  location,
  service,
  rating,
  reviews,
  tags = [],
  description,
  stats,
}: PostCard) {
  const likeCount = stats?.likes ?? 0;
  const commentCount = stats?.comments ?? 0;
  const shareCount = stats?.shares ?? 0;
  const impressionsCount = stats?.impressions ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow p-3 md:p-4 space-y-2.5 md:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 md:gap-3">
          <Link to={`/customer/service-provider/${id}`}>
            <ProfileImage size="size-12 md:size-14" noStatus />
          </Link>

          <div className="min-w-0">
            {name && (
              <Link
                to={`/customer/service-provider/${id}`}
                className="no-underline hover:no-underline"
              >
                <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  {name}
                </h3>
              </Link>
            )}

            <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500">
              {location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="md:w-[14px]" /> {location}
                </span>
              )}
              {rating && (
                <span className="inline-flex items-center gap-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{rating}</span>
                  {reviews && (
                    <span className="text-gray-500">({reviews} reviews)</span>
                  )}
                </span>
              )}
            </div>

            {service && (
              <Link
                to={`/customer/service-provider/${id}`}
                className="text-xs md:text-sm text-blue-600 font-medium no-underline hover:no-underline"
              >
                {service}
              </Link>
            )}
          </div>
        </div>
      </div>

      {description && (
        <div className="pl-[3.65rem] md:pl-[4.2rem]">
          <p className="text-gray-600 text-sm md:text-base leading-snug md:leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2 pl-[3.65rem] md:pl-[3.5rem]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pl-[3.65rem] md:pl-[3.5rem] pr-2 md:pr-4 pt-2 md:pt-3 border-t border-gray-200 text-gray-500">
        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <Heart size={17} className="md:w-[20px] lg:w-[22px]" />{" "}
          <span>{likeCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <MessageCircle size={17} className="md:w-[20px] lg:w-[22px]" />{" "}
          <span>{commentCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <Share2 size={17} className="md:w-[20px] lg:w-[22px]" />{" "}
          <span>{shareCount}</span>
        </button>

        <button className="flex items-center gap-1 text-xs md:text-sm lg:text-base hover:text-blue-600 transition">
          <BarChart2 size={17} className="md:w-[20px] lg:w-[22px]" />{" "}
          <span>{impressionsCount}</span>
        </button>
      </div>
    </div>
  );
}
