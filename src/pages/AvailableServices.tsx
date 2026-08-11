import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Search, ImageIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { vocationalCategories, digitalCategories } from '@/data/staticServices'
import type { ServiceCategory } from '@/data/staticServices'

// ─── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({ id, name, image, roles }: ServiceCategory) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link to={`/customer/services/available-services/${id}`} className="block h-full">
      <div className="bg-white border border-neutral-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[180px]">
        <div>
          <h3 className="text-neutral-900 font-bold text-sm sm:text-base capitalize line-clamp-2 mb-1 leading-snug">
            {name}
          </h3>
          <p className="text-xs text-neutral-400 mb-3">{roles.length} specialist{roles.length !== 1 ? 's' : ''}</p>
        </div>
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
          {image && !imgError ? (
            <img
              src={image}
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

// ─── Grid ──────────────────────────────────────────────────────────────────────

function CategoryGrid({ categories }: { categories: ServiceCategory[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} {...cat} />
      ))}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

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
              <CategoryGrid categories={vocationalCategories} />
            </TabsContent>

            <TabsContent value="digital" className="mt-4 md:mt-6">
              <CategoryGrid categories={digitalCategories} />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
