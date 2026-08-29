import { ChevronDown, ImageIcon } from 'lucide-react'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import SearchBar from '@/components/global/SearchBar'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
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

function RoleCard({ role }: { role: string }) {
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
          <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
            <ImageIcon className="w-7 h-7 text-neutral-300" />
            <span className="text-xs text-neutral-400 capitalize text-center">
              {role}
            </span>
          </div>
        </figure>
      </div>
    </Link>
  )
}

// ─── Provider list view ────────────────────────────────────────────────────────

function ProviderList({ profession }: { profession: string }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<{
    min_charge: string | null
    ratings: string | null
    search: string | null
  }>({ min_charge: null, ratings: null, search: null })

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
    ...filters,
    min_charge: filters.min_charge ? Number(filters.min_charge) : null,
    ratings: filters.ratings ? Number(filters.ratings) : null,
  })

  const { data: favoritesData, isLoading: favoritesLoading } = useFavourites()
  const favourites: Favorite[] =
    favoritesData?.pages.flatMap(
      (page) => page?.data?.results ?? page?.results ?? [],
    ) ?? []
  const allFavourites = favourites?.flatMap((f) => f.providers)
  const providersID = allFavourites?.map(({ provider_id }) => provider_id)
  const favoriteID = favourites?.flatMap((f) => f.favourite_id)

  const professionals: Provider[] =
    data?.pages.flatMap((page) => page?.results ?? []) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleError = async () => {
    if (!data) refetch()
    else fetchNextPage()
  }

  const handleFilters = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search service"
        maxWidth="100%"
        value={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={() => handleFilters('search', searchQuery)}
      />

      <div className="hidden md:flex items-center justify-center gap-3">
        {['Rating', 'Price'].map((label) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm w-28 cursor-pointer hover:bg-gray-50"
          >
            {label}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
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
                {filters.search
                  ? 'No professional found. Adjust your filters'
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
                className="shadow-sm px-4 py-1 text-sm font-medium rounded-sm cursor-pointer hover:shadow-md block w-max mx-auto"
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
      <div className="min-h-screen">
        <HeaderWithBackNavigation title={category.name} />
        <Container>
          <div className="py-4 md:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {category.roles.map((role) => (
                <RoleCard key={role} role={role} />
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
    <div className="min-h-screen">
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
