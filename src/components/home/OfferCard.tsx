import { Pencil, Trash2, Send } from 'lucide-react'

interface OfferCardProps {
  title: string
  description: string
  posted: string
  views: string
  inquiries: string
  media?: string[]
  active?: boolean
}

export default function OfferCard({
  title,
  description,
  posted,
  views,
  inquiries,
  media,
  active,
}: OfferCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-4 w-full">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
          {title}
        </h3>
        {active && (
          <span className="text-xs sm:text-sm font-medium px-3 md:px-8 py-1  bg-green-100 text-green-700 rounded-full">
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
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-wrap juustify-between gap-x-3 md:gap-x-6 text-sm text-gray-500">
        <span>{posted}</span>
        <span>{views}</span>
        <span>{inquiries}</span>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[#222BDE] text-white text-sm hover:opacity-90">
          <Pencil size={16} />
          Edit
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-yellow-400 text-white text-sm hover:opacity-90">
          <Send size={16} />
          Boost
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-gray-200 text-gray-700 text-sm hover:bg-gray-50">
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  )
}
