import type { Service } from '@/types/services.types'
import { Link } from 'react-router-dom'

export default function ServicesCard({ name, attachments }: Service) {
  const formatServiceName = name.replaceAll(' ', '-')
  
  return (
    <Link to={`/customer/services/available-services/${formatServiceName}`} className="block h-full">
      {/* 
        CARD WRAPPER: Changed to white background, added prominent border radius (rounded-2xl), 
        internal padding (p-4.5), and a subtle border/shadow to lift it off the gray background.
      */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[260px]">
        
        {/* TEXT LAYER: Placed at the top with a dark, bold, left-aligned font style */}
        <h3 className="text-neutral-900 font-bold text-sm sm:text-base capitalize line-clamp-2 mb-3 leading-snug">
          {name}
        </h3>

        {/* IMAGE LAYER: Wrapped in a container box mimicking the asset design from the screenshot */}
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 p-1 flex items-center justify-center">
          <img
            src={attachments[0]?.image_url}
            alt={name}
            className="rounded-lg object-cover w-full h-full"
            loading="lazy"
          />
        </figure>
      </div>
    </Link>
  )
}
