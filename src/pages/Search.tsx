import { searchCategories, searchFilters, serviceTypes } from '@/assets/data'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { currencyFormatter } from '@/utils/format'
import { ChevronLeft, Search, Sliders, X } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import NoResultFound from '@/components/global/NoResultFound'
import Ratings from '@/components/global/Ratings'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import PostCard from '@/components/home/PostCard'
import { useAllProviders } from '@/hooks/useUsers'
import { useFavourites } from '@/hooks/useFavourites'
import { useOffers, usePosts } from '@/hooks/usePosts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Provider } from '@/types/user.types'
import type { Favorite } from '@/types/favourites.type'
import type { Post } from '@/types/post.types'

const MAX_PRICE = 1000000

type AppliedFilters = {
  service: string[]
  price: number[]
  rating: number | undefined
}

const EMPTY_FILTERS: AppliedFilters = {
  service: [],
  price: [0, MAX_PRICE],
  rating: undefined,
}

function serviceLabel(value: string): string {
  return serviceTypes.find((t) => t.value === value)?.label ?? ''
}

function matchesProviderSearch(provider: Provider, query: string): boolean {
  if (!query) return true
  const text = [
    provider.professional_title,
    provider.headline,
    provider.user?.profile?.display_name,
    provider.user
      ? `${provider.user.first_name ?? ''} ${provider.user.last_name ?? ''}`
      : '',
    provider.user?.profile?.city,
    provider.user?.profile?.state,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return text.includes(query)
}

function matchesProviderFilters(
  provider: Provider,
  services: string[],
  price: number[],
  rating: number | undefined,
): boolean {
  if (services.length > 0) {
    const title = (provider.professional_title || '').toLowerCase()
    const headline = (provider.headline || '').toLowerCase()
    const match = services.some((svc) => {
      const label = serviceLabel(svc).toLowerCase()
      const labelTokens = label.split(/\s+/).filter(Boolean)
      return labelTokens.some(
        (lt) =>
          lt.length > 2 &&
          (title.includes(lt) ||
            headline.includes(lt) ||
            lt.includes(title) ||
            lt.includes(headline)),
      )
    })
    if (!match) return false
  }
  const [minPrice, maxPrice] = price
  const charge = Number(provider.min_charge ?? 0)
  if (minPrice > 0 && charge < minPrice) return false
  if (maxPrice < MAX_PRICE && charge > maxPrice) return false
  if (rating !== undefined && Number(provider.avg_rating ?? 0) < rating)
    return false
  return true
}

function matchesPostSearch(post: Post, query: string): boolean {
  if (!query) return true
  const text = [
    post.post_title,
    post.post_content,
    post.tags?.[0]?.name,
    post.user?.profile?.display_name,
    post.user ? `${post.user.first_name ?? ''} ${post.user.last_name ?? ''}` : '',
    post.city,
    post.state,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return text.includes(query)
}

function matchesPostFilters(
  post: Post,
  services: string[],
  price: number[],
): boolean {
  if (services.length > 0) {
    const tag = (post.tags?.[0]?.name ?? '').toLowerCase()
    const match = services.some((svc) => {
      const label = serviceLabel(svc).toLowerCase()
      return !!label && (tag.includes(label) || label.includes(tag))
    })
    if (!match) return false
  }
  const [minPrice, maxPrice] = price
  const amount = Number(post.amount ?? 0)
  if (minPrice > 0 && amount < minPrice) return false
  if (maxPrice < MAX_PRICE && amount > maxPrice) return false
  return true
}

function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: {
  filters: AppliedFilters
  onFiltersChange: (next: AppliedFilters) => void
  onApply: () => void
  onReset: () => void
}) {
  const [filterType, setFilterType] = useState('services')

  const toggleService = (value: string, checked: boolean) => {
    const next = checked
      ? [...filters.service, value]
      : filters.service.filter((s) => s !== value)
    onFiltersChange({ ...filters, service: next })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        {searchFilters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilterType(value)}
            className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
              filterType === value
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filterType === 'services' && (
          <div className="space-y-3">
            {serviceTypes.map(({ label, value }) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`svc-${value}`}
                  checked={filters.service.includes(value)}
                  onCheckedChange={(checked) =>
                    toggleService(value, checked as boolean)
                  }
                  className="border border-primary rounded-full"
                />
                <Label
                  htmlFor={`svc-${value}`}
                  className="text-sm lg:text-base font-normal cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {filterType === 'price' && (
          <div className="space-y-4">
            <span className="text-sm font-medium block">Price Range</span>
            <Slider
              value={filters.price}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, price: value })
              }
              min={0}
              max={MAX_PRICE}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>{currencyFormatter(filters.price[0])}</span>
              <span>{currencyFormatter(filters.price[1])}</span>
            </div>
          </div>
        )}

        {filterType === 'rating' && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((value) => (
              <div
                key={value}
                className="flex items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`rating-${value}`}
                    checked={filters.rating === value}
                    onCheckedChange={(checked) =>
                      onFiltersChange({
                        ...filters,
                        rating: checked ? value : undefined,
                      })
                    }
                    className="rounded-full border border-primary w-4 h-4"
                  />
                  <Label
                    htmlFor={`rating-${value}`}
                    className="cursor-pointer"
                  >
                    <Ratings rating={value} />
                  </Label>
                </div>
                <span className="text-sm lg:text-base">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium underline text-primary cursor-pointer"
        >
          Reset filters
        </button>
        <button
          type="button"
          onClick={onApply}
          className="px-6 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 cursor-pointer transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default function SearchPage() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('providers')
  const [filters, setFilters] = useState<AppliedFilters>(EMPTY_FILTERS)
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>(EMPTY_FILTERS)
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get('query') ?? '',
  )
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  useEffect(() => {
    setSearchQuery(new URLSearchParams(location.search).get('query') ?? '')
  }, [location.search])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const activeFilterCount =
    filters.service.length +
    (filters.price[0] !== 0 ? 1 : 0) +
    (filters.price[1] !== MAX_PRICE ? 1 : 0) +
    (filters.rating !== undefined ? 1 : 0)

  const hasActiveFilters = activeFilterCount > 0
  const canSearch = !!debouncedQuery || hasActiveFilters

  const providersEnabled = category === 'providers' && canSearch
  const postsEnabled = category === 'post' && canSearch
  const offersEnabled = category === 'offers' && canSearch
  const favouritesEnabled = providersEnabled

  const {
    data: providersData,
    isLoading: providersLoading,
    isError: providersIsError,
    error: providersError,
    refetch: refetchProviders,
    fetchNextPage: fetchProvidersNextPage,
    hasNextPage: providersHasNextPage,
    isFetchingNextPage: providersFetchingNextPage,
    isFetchNextPageError: providersFetchNextPageError,
  } = useAllProviders({ search: debouncedQuery, enabled: providersEnabled })
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsIsError,
    error: postsError,
    refetch: refetchPosts,
    fetchNextPage: fetchPostsNextPage,
    hasNextPage: postsHasNextPage,
    isFetchingNextPage: postsFetchingNextPage,
    isFetchNextPageError: postsFetchNextPageError,
  } = usePosts({ enabled: postsEnabled })
  const {
    data: offersData,
    isLoading: offersLoading,
    isError: offersIsError,
    error: offersError,
    refetch: refetchOffers,
    fetchNextPage: fetchOffersNextPage,
    hasNextPage: offersHasNextPage,
    isFetchingNextPage: offersFetchingNextPage,
    isFetchNextPageError: offersFetchNextPageError,
  } = useOffers({ enabled: offersEnabled })
  const { data: favoritesData, isLoading: favoritesLoading } = useFavourites({
    enabled: favouritesEnabled,
  })

  const favourites: Favorite[] =
    favoritesData?.pages?.flatMap(
      (page) => page?.data?.results ?? page?.results ?? [],
    ) ?? []
  const allFavourites = favourites?.flatMap(
    (favourite) => favourite?.providers ?? [],
  )
  const providersID = allFavourites
    ?.map(({ provider_id }) => provider_id)
    .filter(Boolean)
  const favoriteID = favourites?.flatMap(
    (favourite) => favourite?.favourite_id ?? [],
  )

  const selectedServices = filters.service

  const filteredProviders = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return (providersData?.pages.flatMap((page) => page?.results ?? []) ?? []).filter(
      (p) =>
        matchesProviderSearch(p, q) &&
        matchesProviderFilters(
          p,
          selectedServices,
          filters.price,
          filters.rating,
        ),
    )
  }, [providersData, debouncedQuery, selectedServices, filters.price, filters.rating])

  const filteredPosts = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return (postsData?.pages.flatMap((page) => page?.results ?? []) ?? []).filter(
      (p) =>
        matchesPostSearch(p, q) &&
        matchesPostFilters(p, selectedServices, filters.price),
    )
  }, [postsData, debouncedQuery, selectedServices, filters.price])

  const filteredOffers = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return (offersData?.pages.flatMap((page) => page?.results ?? []) ?? []).filter(
      (o) =>
        matchesPostSearch(o, q) &&
        matchesPostFilters(o, selectedServices, filters.price),
    )
  }, [offersData, debouncedQuery, selectedServices, filters.price])

  const isLoading =
    category === 'providers'
      ? providersLoading || favoritesLoading
      : category === 'post'
        ? postsLoading
        : offersLoading
  const isError =
    category === 'providers'
      ? providersIsError
      : category === 'post'
        ? postsIsError
        : offersIsError
  const errorMessage =
    category === 'providers'
      ? (providersError as Error | null)?.message
      : category === 'post'
        ? (postsError as Error | null)?.message
        : (offersError as Error | null)?.message
  const results =
    category === 'providers'
      ? filteredProviders
      : category === 'post'
        ? filteredPosts
        : filteredOffers
  const resultCount = results.length
  const handleFetchError = () => {
    if (category === 'providers') refetchProviders()
    else if (category === 'post') refetchPosts()
    else refetchOffers()
  }

  const loadMoreRef = useInfiniteScroll({
    hasNextPage:
      category === 'providers'
        ? providersHasNextPage
        : category === 'post'
          ? postsHasNextPage
          : offersHasNextPage,
    isFetchingNextPage:
      category === 'providers'
        ? providersFetchingNextPage
        : category === 'post'
          ? postsFetchingNextPage
          : offersFetchingNextPage,
    fetchNextPage:
      category === 'providers'
        ? fetchProvidersNextPage
        : category === 'post'
          ? fetchPostsNextPage
          : fetchOffersNextPage,
  })

  const handleSelectCategory = (value: string) => {
    setCategory((prev) => (prev === value ? 'providers' : value))
  }

  const handleApplyFilter = () => {
    setFilters(draftFilters)
    setOpen(false)
  }

  const handleResetFilters = () => {
    setFilters(EMPTY_FILTERS)
    setDraftFilters(EMPTY_FILTERS)
  }

  const handleSearchQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    navigate(trimmed ? `?query=${encodeURIComponent(trimmed)}` : '', {
      replace: true,
    })
  }

  const showNoResults = canSearch && !isLoading && !isError && resultCount === 0

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:ml-21 md:ml-21">
        <div className="lg:col-span-3">
          <div className="bg-white px-2 md:px-4 py-3 flex items-center gap-2">
            <button
              type="button"
              className="flex items-center justify-center cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="sr-only">Back</span>
            </button>
            <form onSubmit={handleSearchQuery} className="relative flex-1">
              <Input
                type="text"
                className="pl-3 pr-10 rounded-md border h-9 md:h-10 text-sm md:text-base"
                placeholder="Search people, posts, offers…"
                name="searchQuery"
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery('')
                    navigate('', { replace: true })
                  }}
                  className="absolute top-1/2 -translate-y-1/2 right-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Search"
                className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-full text-white rounded-r-md flex items-center justify-center bg-primary cursor-pointer"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </form>
            <button
              type="button"
              aria-label="Open filters"
              onClick={() => {
                setDraftFilters(filters)
                setOpen(true)
              }}
              className="relative px-2 rounded-md border h-9 md:h-10 flex items-center justify-center cursor-pointer lg:hidden"
            >
              <Sliders className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto px-2 md:px-4 py-3 bg-white border-t">
            {searchCategories.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleSelectCategory(value)}
                className={`flex items-center gap-3 border py-1.5 px-4 rounded-full w-max text-xs md:text-sm cursor-pointer font-medium whitespace-nowrap transition-colors ${
                  category === value
                    ? 'text-white bg-primary border-primary'
                    : 'border-primary/20 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-[50vh] bg-white border-t">
            <div className="flex items-center justify-between px-2 md:px-4 py-3">
              <h2 className="font-semibold text-sm md:text-base text-gray-900">
                {!canSearch
                  ? 'Search'
                  : debouncedQuery
                    ? `Results for "${debouncedQuery}"`
                    : 'Filtered results'}
              </h2>
              {canSearch && !isLoading && !isError && (
                <span className="text-xs text-gray-500">
                  {resultCount} result{resultCount === 1 ? '' : 's'}
                </span>
              )}
            </div>

            {!canSearch ? (
              <NoResultFound
                text="Search to get started"
                subtitle="Search for people, posts, and offers"
                icon={Search}
              />
            ) : isLoading ? (
              <div className="h-24 py-10">
                <Loading />
              </div>
            ) : isError ? (
              <div className="py-10">
                <Error
                  text={
                    errorMessage
                      ? `Failed to load results: ${errorMessage}`
                      : 'Failed to load search results'
                  }
                  buttonFunc={handleFetchError}
                />
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4 p-2 md:p-4">
                {category === 'providers' &&
                  filteredProviders.map((professional) => (
                    <ServiceProviderCard
                      key={professional.provider_id}
                      {...professional}
                      providerIDs={providersID}
                      favouriteID={favoriteID[0]}
                    />
                  ))}
                {category === 'post' &&
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post.post_id ?? post.updated_at}
                      {...post}
                      queryKey={['search-posts']}
                    />
                  ))}
                {category === 'offers' &&
                  filteredOffers.map((offer) => (
                    <PostCard
                      key={offer.post_id ?? offer.updated_at}
                      {...offer}
                      queryKey={['search-offers']}
                    />
                  ))}

                {showNoResults && (
                  <NoResultFound
                    text="No results found"
                    subtitle="Try a different search or adjust your filters"
                    icon={Search}
                  />
                )}

                <div ref={loadMoreRef} />
                {(category === 'providers'
                  ? providersFetchingNextPage
                  : category === 'post'
                    ? postsFetchingNextPage
                    : offersFetchingNextPage) && (
                  <div className="py-4 text-center">
                    <Loading />
                  </div>
                )}
                {(category === 'providers'
                  ? providersFetchNextPageError
                  : category === 'post'
                    ? postsFetchNextPageError
                    : offersFetchNextPageError) && (
                  <Error
                    text="Failed to load more results"
                    buttonFunc={handleFetchError}
                    buttonText="Retry"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-4 ml-4 bg-white border rounded-lg overflow-hidden h-max">
            <div className="px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-900">Filter by</h3>
            </div>
            <FilterPanel
              filters={draftFilters}
              onFiltersChange={setDraftFilters}
              onApply={handleApplyFilter}
              onReset={handleResetFilters}
            />
          </div>
        </aside>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[85%] sm:max-w-sm bg-white p-0"
        >
          <SheetHeader className="px-4 py-3 border-b">
            <div className="text-center">
              <SheetTitle className="text-base">Filter by</SheetTitle>
              <SheetDescription className="sr-only">
                Filter search results
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="h-[calc(100%-60px)]">
            <FilterPanel
              filters={draftFilters}
              onFiltersChange={setDraftFilters}
              onApply={handleApplyFilter}
              onReset={handleResetFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
