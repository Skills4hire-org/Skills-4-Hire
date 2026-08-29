import { ImageIcon, Sliders } from 'lucide-react'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import SearchBar from '@/components/global/SearchBar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { FilterPanel } from '@/components/filters/FilterPanel'
import {
  EMPTY_FILTERS,
  countActiveFilters,
  matchesProviderFilters,
} from '@/components/filters/filterUtils'
import type { AppliedFilters } from '@/components/filters/filterUtils'
import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useAllProviders } from '@/hooks/useUsers'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import ServiceProviderServiceCard from '@/components/service-provider/ServiceProviderServiceCard'
import type { Provider } from '@/types/user.types'
import type { Favorite } from '@/types/favourites.type'
import { useFavourites } from '@/hooks/useFavourites'
import { categoryBySlug } from '@/data/staticServices'

// ─── Sub-role card ─────────────────────────────────────────────────────────────

function RoleCard({ role, image }: { role: string; image?: string }) {
  const [imageError, setImageError] = useState(false)
  const slug = role.replaceAll(' ', '-')
  return (
    <Link
      to={`/customer/services/available-services/${slug}`}
      className="block h-full"
    >
      <div className="bg-white border border-neutral-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[140px]">
        <h3 className="text-neutral-900 font-bold text-sm capitalize line-clamp-2 mb-3 leading-snug">
          {role}
        </h3>
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
          {image && !imageError ? (
            <img
              src={image}
              alt={role}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
              <ImageIcon className="w-7 h-7 text-neutral-300" />
              <span className="text-xs text-neutral-400 capitalize text-center">
                {role}
              </span>
            </div>
          )}
        </figure>
      </div>
    </Link>
  )
}

// ─── Provider list view ────────────────────────────────────────────────────────

function ProviderList({ profession }: { profession: string }) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [providerSearchQuery, setProviderSearchQuery] = useState('')
  const [filters, setFilters] = useState<AppliedFilters>(EMPTY_FILTERS)
  const [draftFilters, setDraftFilters] =
    useState<AppliedFilters>(EMPTY_FILTERS)

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useAllProviders({
    profession,
    search: providerSearchQuery || null,
  })

  const { data: favoritesData, isLoading: favoritesLoading } = useFavourites()
  const favourites: Favorite[] =
    favoritesData?.pages.flatMap(
      (page) => page?.data?.results ?? page?.results ?? [],
    ) ?? []
  const allFavourites = favourites?.flatMap((f) => f.providers)
  const providersID = allFavourites?.map(({ provider_id }) => provider_id)
  const favoriteID = favourites?.flatMap((f) => f.favourite_id)

  const professionals: Provider[] = useMemo(() => {
    const all = data?.pages.flatMap((page) => page?.results ?? []) ?? []
    return all.filter((provider) =>
      matchesProviderFilters(
        provider,
        filters.service,
        filters.price,
        filters.rating,
      ),
    )
  }, [data, filters.service, filters.price, filters.rating])

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleError = async () => {
    if (!data) refetch()
    else fetchNextPage()
  }

  const handleSearchSubmit = () => {
    setProviderSearchQuery(searchQuery)
  }

  const appliedFilterCount = countActiveFilters(filters)
  const hasActiveFilters = appliedFilterCount > 0

  const handleApply = () => {
    setFilters(draftFilters)
    setOpen(false)
  }

  const handleReset = () => {
    setFilters(EMPTY_FILTERS)
    setDraftFilters(EMPTY_FILTERS)
  }

  return (
    <div className="lg:grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar
              placeholder="Search service"
              maxWidth="100%"
              value={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <button
            type="button"
            aria-label="Open filters"
            onClick={() => {
              setDraftFilters(filters)
              setOpen(true)
            }}
            className="relative px-2 rounded-md border h-8 md:h-9 flex items-center justify-center cursor-pointer lg:hidden shrink-0"
          >
            <Sliders className="w-4 h-4" />
            {appliedFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                {appliedFilterCount}
              </span>
            )}
          </button>
        </div>

        <div>
          {isLoading || favoritesLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : isError ? (
            <div className="py-10">
              <Error
                text="Failed to load professionals"
                buttonFunc={handleError}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {professionals?.map((professional) => (
                  <ServiceProviderServiceCard
                    key={professional.provider_id}
                    {...professional}
                    providerIDs={providersID}
                    favouriteID={favoriteID[0]}
                  />
                ))}
              </div>

              {professionals?.length === 0 && (
                <p className="text-center text-sm md:text-base text-gray-400 py-6">
                  {hasActiveFilters || providerSearchQuery
                    ? 'No professional found. Adjust your search or filters'
                    : 'No professional providing this service yet. Check back later.'}
                </p>
              )}

              <div ref={loadMoreRef} />

              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
              {hasNextPage && (
                <button
                  className="shadow-sm px-4 py-1 text-sm font-medium rounded-sm cursor-pointer hover:shadow-md"
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </button>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </>
          )}
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-4 bg-white border rounded-lg overflow-hidden h-max">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Filter by</h3>
          </div>
          <FilterPanel
            filters={draftFilters}
            onFiltersChange={setDraftFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[85%] sm:max-w-sm bg-white p-0">
          <SheetHeader className="px-4 py-3 border-b">
            <div className="text-center">
              <SheetTitle className="text-base">Filter by</SheetTitle>
              <SheetDescription className="sr-only">
                Filter service providers
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="h-[calc(100%-60px)]">
            <FilterPanel
              filters={draftFilters}
              onFiltersChange={setDraftFilters}
              onApply={handleApply}
              onReset={handleReset}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SingleService() {
  const { service } = useParams<{ service: string }>()

  // Check if this slug matches a known category
  const category = service ? categoryBySlug[service] : undefined

  // If it's a category → show sub-role cards
  if (category) {
    return (
      <div className="min-h-screen lg:ml-17">
        <HeaderWithBackNavigation title={category.name} />
        <Container>
          <div className="py-4 md:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {category.roles.map((role) => (
                <RoleCard key={role} role={role} image={category.image} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // Otherwise it's a specific role slug → show providers
  const formatService = service?.replaceAll('-', ' ') ?? ''

  return (
    <div className="min-h-screen lg:ml-17">
      <div className="capitalize">
        <HeaderWithBackNavigation title={formatService} />
      </div>
      <Container>
        <div className="space-y-4">
          <ProviderList profession={formatService} />
        </div>
      </Container>
    </div>
  )
}
