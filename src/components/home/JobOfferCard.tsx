import ProfileImage from "@/components/global/ProfileImage";
import {
  MapPin,
  Clock,
  Wallet,
  Check,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

interface JobOffer {
  id: number | string;
  name: string;
  role?: string;
  location?: string;
  title: string;
  description?: string;
  budget?: string;
  deadline?: string;
  distanceKm?: number;
  images?: string[];
}

export default function JobOfferCard({
  name,
  role,
  location,
  title,
  description,
  budget,
  deadline,
  distanceKm,
  images = [],
}: JobOffer) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <ProfileImage noStatus size="size-12 md:size-14" />
        </div>

        <div className="min-w-0">
          <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
            {name}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
            {role && <span className="truncate">{role}</span>}
            {location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{location}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
        {typeof distanceKm !== "undefined" && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 whitespace-nowrap">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Within {distanceKm} km</span>
          </span>
        )}

        {deadline && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-50 text-yellow-800 whitespace-nowrap">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Deadline: {deadline}</span>
          </span>
        )}

        {budget && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 whitespace-nowrap">
            <Wallet className="w-4 h-4 shrink-0" />
            <span>Budget: {budget}</span>
          </span>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`offer-${i}`}
              className="w-full h-28 md:h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="mt-2">
        <div className="flex gap-2 flex-nowrap">
          <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-white text-sm md:text-base hover:opacity-90 transition">
            <Check className="w-4 h-4" />
            <span>Accept</span>
          </button>

          <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-yellow-400 text-white text-sm md:text-base hover:opacity-90 transition">
            <RefreshCw className="w-4 h-4" />
            <span>Negotiate</span>
          </button>

          <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition">
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
