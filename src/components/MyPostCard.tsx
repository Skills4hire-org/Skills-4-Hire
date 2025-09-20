import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Edit2,
  Trash2,
  Zap,
  Calendar,
  Eye,
  MessageSquare,
} from "lucide-react";

interface MyPostCardProps {
  image?: string;
  title: string;
  description: string;
  active?: boolean;
  posted?: string;
  views?: string;
  inquiries?: string;
}

export default function MyPostCard({
  image,
  title,
  description,
  active = true,
  posted = "Posted today",
  views = "23 views",
  inquiries = "5 enquiries",
}: MyPostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-5 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {active && (
          <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-md">
            Active
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {image && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <img
            src={image}
            alt={title}
            className="w-full h-32 object-cover rounded-lg"
          />
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

      <div className="flex justify-around text-gray-500 text-sm py-2 border-t">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <ThumbsUp size={16} /> Like
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <MessageCircle size={16} /> Comment
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-2 pt-2 border-t border-gray-200">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center justify-center">
          <Edit2 size={16} className="mr-1" /> Edit
        </button>
        <button className="flex-1 bg-yellow-400 text-white py-2 rounded-xl shadow hover:bg-yellow-500 transition flex items-center justify-center">
          <Zap size={16} className="mr-1" /> Boost
        </button>
        <button className="flex-1 bg-red-500 text-white py-2 rounded-xl shadow hover:bg-red-600 transition flex items-center justify-center">
          <Trash2 size={16} className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
}
