import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Search, ImageIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { staticVocationalServices, staticDigitalServices } from '@/data/staticServices'
import type { Service } from '@/types/services.types'

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ name, localImage, attachments }: Service) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = attachments?.[0]?.image_url ?? localImage
  const slug = name?.replaceAll(' ', '-') ?? 'service'

  return (
    <Link to={`/customer/services/available-services/${slug}`} className="block h-full">
      <div className="bg-white border border-neutral-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[180px]">
        <h3 className="text-neutral-900 font-bold text-sm sm:text-base capitalize line-clamp-2 mb-3 leading-snug">
          {name}
        </h3>
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={name}
              className="rounded-xl object-cover w-full h-full"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
              <ImageIcon className="w-8 h-8 text-neutral-300" />
              <span className="text-xs text-neutral-400 capitalize text-center">{name}</span>
            </div>
          )}
        </figure>
      </div>
    </Link>
  )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {items.map((item) => (
        <ServiceCard key={item.service_id} {...item} />
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AvailableServices() {
  return (
    <div className="space-y-2 md:space-y-6 lg:ml-17">
      <HeaderWithBackNavigation title="Available services" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <Link to="/customer/services/search">
            <div className="relative w-full mx-auto">
              <Input
                type="text"
                className="pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base"
                placeholder="Search for services"
                readOnly
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>
          </Link>

          <Tabs defaultValue="vocational">
            <div className="flex justify-center md:justify-start">
              <TabsList className="w-full max-w-md h-11">
                <TabsTrigger value="vocational" className="text-xs md:text-sm w-1/2">
                  Vocational & On-Site
                </TabsTrigger>
                <TabsTrigger value="digital" className="text-xs md:text-sm w-1/2">
                  Digital Skills
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="vocational" className="mt-4 md:mt-6">
              <ServiceGrid items={staticVocationalServices} />
            </TabsContent>

            <TabsContent value="digital" className="mt-4 md:mt-6">
              <ServiceGrid items={staticDigitalServices} />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}


// The AvailableServices.tsx no longer calls the /api/v1/services-categories/ endpoint at all. If the CEO later wants real backend data to show here, that'll need to be wired back in.