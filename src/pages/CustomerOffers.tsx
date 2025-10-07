import {
  Pencil,
  Trash2,
  Send,
  Eye,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { customerOffers } from "../utils/database";

export default function CustomerOffers() {
  return (
    <div
      className="
        flex flex-col items-center 
        w-full 
        pt-[0.2rem] 
        space-y-5 
        px-1 sm:px-2
      "
    >
      {customerOffers.map((offer, idx) => (
        <OfferCard key={idx} {...offer} />
      ))}
    </div>
  );
}

function OfferCard({
  title,
  description,
  posted,
  views,
  inquiries,
  media,
  active,
}: {
  title: string;
  description: string;
  posted: string;
  views: string;
  inquiries: string;
  media?: string[];
  active?: boolean;
}) {
  return (
    <div
      className="
        bg-white 
        rounded-lg 
        shadow 
        p-5 sm:p-6 
        space-y-4 
        w-[99%] sm:w-[97%] md:w-[95%] lg:w-[85%] 
        mx-auto
      "
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
          {title}
        </h3>
        {active && (
          <span className="text-xs sm:text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {media && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {media.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`media-${i}`}
              className="w-full h-36 sm:h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-5 text-sm text-gray-500 items-center">
        <span className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-400" />
          {posted}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} className="text-gray-400" />
          {views}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={14} className="text-gray-400" />
          {inquiries}
        </span>
      </div>

      <div className="flex justify-between items-center gap-2 text-sm">
        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md bg-[#222BDE] text-white hover:opacity-90 transition-all">
          <Pencil size={15} />
          Edit
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md bg-yellow-400 text-white hover:opacity-90 transition-all">
          <Send size={15} />
          Boost
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
}
