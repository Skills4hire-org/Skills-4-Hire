import type { Service } from '@/types/services.types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { roleImageMap } from '@/data/roleImageMap'

export default function ServicesCard({ name, attachments, localImage }: Service) {
  const formatServiceName = name?.replaceAll(' ', '-') ?? 'service'
  // Prefer API-supplied image → pro-image by role name → bundled local image
  const imageUrl = attachments?.[0]?.image_url ?? roleImageMap[name] ?? localImage
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      to={`/customer/services/available-services/${formatServiceName}`}
      className="block h-full"
    >
      {/* 
        CARD WRAPPER: Changed to white background, added prominent border radius (rounded-2xl), 
        internal padding (p-4.5), and a subtle border/shadow to lift it off the gray background.
      */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[200px]">
        {/* TEXT LAYER: Placed at the top with a dark, bold, left-aligned font style */}
        <h3 className="text-neutral-900 font-bold text-sm sm:text-base capitalize line-clamp-2 mb-3 leading-snug">
          {name}
        </h3>

        {/* IMAGE LAYER: Wrapped in a container box mimicking the asset design from the screenshot */}
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 p-1 flex items-center justify-center">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={name}
              className="rounded-lg object-cover w-full h-full"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full">
              <ImageIcon className="w-8 h-8 text-neutral-300" />
              <span className="text-xs text-neutral-400 capitalize">
                {name}
              </span>
            </div>
          )}
        </figure>
      </div>
    </Link>
  )
}
