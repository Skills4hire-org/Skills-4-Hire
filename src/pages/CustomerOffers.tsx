import { Pencil, Trash2, Send } from 'lucide-react'
import Rect18 from '../assets/Rectangle 18.png'
import Rect19 from '../assets/Rectangle 19.png'

export default function CustomerOffers() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ---- My Offers List ---- */}
      <OfferCard
        title="Need plumber to fix leaking tap"
        description="Looking for an experienced plumber to fix a constantly dripping kitchen faucet. It can be done as fast as you want."
        posted="Posted: Dec 15, 2024"
        views="247 views"
        inquiries="12 inquiries"
        active
      />

      <OfferCard
        title="Emergency plumbing repairs"
        description="Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues."
        posted="Posted: Dec 18, 2024"
        views="241 views"
        inquiries="12 inquiries"
        active
        media={[Rect19, Rect18]}
      />

      <OfferCard
        title="Bathroom Renovation Services"
        description="Complete bathroom renovation services, including plumbing, tiling, waterproofing, and finishing to modern standards."
        posted="Posted: Dec 20, 2024"
        views="198 views"
        inquiries="8 inquiries"
        active
      />
    </div>
  )
}

/* --------- Reusable Offer Card ---------- */
function OfferCard({
  title,
  description,
  posted,
  views,
  inquiries,
  media,
  active,
}: {
  title: string
  description: string
  posted: string
  views: string
  inquiries: string
  media?: string[]
  active?: boolean
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4 w-full">
      {/* Header: Title + Active badge */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
          {title}
        </h3>
        {active && (
          <span className="text-xs font-medium px-3 py-0.5 bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {media && media.length > 0 && (
        <div className="flex gap-3">
          {media.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="media"
              className="h-28 w-28 sm:h-32 sm:w-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <span>{posted}</span>
        <span>{views}</span>
        <span>{inquiries}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-[#222BDE] text-white text-xs sm:text-sm hover:opacity-90">
          <Pencil size={14} />
          Edit
        </button>
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-yellow-400 text-white text-xs sm:text-sm hover:opacity-90">
          <Send size={14} />
          Boost
        </button>
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 text-xs sm:text-sm hover:bg-gray-50">
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  )
}
