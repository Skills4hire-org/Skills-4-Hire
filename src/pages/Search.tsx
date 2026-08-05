import { searchCategories, searchFilters, serviceTypes } from '@/assets/data'
import Container from '@/components/global/Container'
import Ratings from '@/components/global/Ratings'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { currencyFormatter } from '@/utils/format'
import { ChevronLeft, Search, Sliders, X } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import NoResultFound from '@/components/global/NoResultFound'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import PostCard from '@/components/home/PostCard'
import { useAllProviders } from '@/hooks/useUsers'
import { useFavourites } from '@/hooks/useFavourites'
import { useOffers, usePosts } from '@/hooks/usePosts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Provider } from '@/types/user.types'
import type { Favorite } from '@/types/favourites.type'
import type { Post } from '@/types/post.types'

export default function SearchPage() {
  const [open, setOpen] = useState(false)
  const [filterType, setFilterType] = useState('services')
  const [service, setService] = useState([''])
  const [price, setPrice] = useState<number[]>([0, 1000000])
  const [rating, setRating] = useState<undefined | number>(undefined)
  const [filters, setFilters] = useState<{
    service: string[]
    price: number[]
    rating: number | undefined
  }>({
    service: [''],
    price: [0, 1000000],
    rating: undefined,
  })
  const [category, setCategory] = useState('providers')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const search = queryParams.get('query')
  const [searchQuery, setSearchQuery] = useState(search || '')
  const navigate = useNavigate()

  const {
    data: providersData,
    isLoading: providersLoading,
    isError: providersError,
    refetch: refetchProviders,
    fetchNextPage: fetchProvidersNextPage,
    hasNextPage: providersHasNextPage,
    isFetchingNextPage: providersFetchingNextPage,
    isFetchNextPageError: providersFetchNextPageError,
  } = useAllProviders({ search: searchQuery })
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
    fetchNextPage: fetchPostsNextPage,
    hasNextPage: postsHasNextPage,
    isFetchingNextPage: postsFetchingNextPage,
    isFetchNextPageError: postsFetchNextPageError,
  } = usePosts()
  const {
    data: offersData,
    isLoading: offersLoading,
    isError: offersError,
    refetch: refetchOffers,
    fetchNextPage: fetchOffersNextPage,
    hasNextPage: offersHasNextPage,
    isFetchingNextPage: offersFetchingNextPage,
    isFetchNextPageError: offersFetchNextPageError,
  } = useOffers({})
  const {
    data: favoritesData,
    isLoading: favoritesLoading,
  } = useFavourites()

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

  const providers: Provider[] =
    providersData?.pages.flatMap((page) => page?.results ?? []) ?? []
  const allPosts: Post[] =
    postsData?.pages.flatMap((page) => page?.results ?? []) ?? []
  const allOffers: Post[] =
    offersData?.pages.flatMap((page) => page?.results ?? []) ?? []

  const selectedServices = filters.service.filter((s) => s !== '')

  const filteredProviders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return providers.filter((p) => {
      const title = (p.professional_title || '').toLowerCase()
      if (q && !title.includes(q)) return false
      if (selectedServices.length > 0) {
        const titleTokens = title.split(/\s+/).filter(Boolean)
        const match = selectedServices.some((svc) => {
          const label =
            serviceTypes.find((t) => t.value === svc)?.label.toLowerCase() ??
            ''
          const labelTokens = label.split(/\s+/).filter(Boolean)
          return labelTokens.some(
            (lt) =>
              lt.length > 2 &&
              titleTokens.some((t) => t.includes(lt) || lt.includes(t)),
          )
        })
        if (!match) return false
      }
      const [minPrice, maxPrice] = filters.price
      const charge = Number(p.min_charge ?? 0)
      if ((minPrice > 0 && charge < minPrice) || (maxPrice < 1000000 && charge > maxPrice))
        return false
      if (filters.rating !== undefined && Number(p.avg_rating ?? 0) < filters.rating)
        return false
      return true
    })
  }, [providers, searchQuery, filters, selectedServices])

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return allPosts.filter(
      (p) => !q || (p.post_content ?? '').toLowerCase().includes(q),
    )
  }, [allPosts, searchQuery])

  const filteredOffers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return allOffers.filter(
      (p) => !q || (p.post_content ?? '').toLowerCase().includes(q),
    )
  }, [allOffers, searchQuery])

  const isLoading =
    category === 'providers'
      ? providersLoading || favoritesLoading
      : category === 'post'
        ? postsLoading
        : offersLoading
  const isError =
    category === 'providers'
      ? providersError
      : category === 'post'
        ? postsError
        : offersError
  const resultCount =
    category === 'providers'
      ? filteredProviders.length
      : category === 'post'
        ? filteredPosts.length
        : filteredOffers.length
  const handleFetchError = () => {
    if (category === 'providers') refetchProviders()
    else if (category === 'post') refetchPosts()
    else refetchOffers()
  }

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: providersHasNextPage,
    isFetchingNextPage: providersFetchingNextPage,
    fetchNextPage: fetchProvidersNextPage,
  })

  const handleSelectCategory = (value: string) => {
    if (value === category) {
      setCategory('providers')
    } else {
      setCategory(value)
    }
  }
  const handleServiceChange = (value: string, checked: boolean) => {
    if (checked) {
      setService([...service, value])
    } else {
      setService(service.filter((s) => s !== value))
    }
  }
  const handleApplyFilter = () => {
    setFilters({
      service,
      price,
      rating,
    })
    setOpen(false)
  }
  const resetFilters = () => {
    setFilters({
      service: [''],
      price: [0, 1000000],
      rating: undefined,
    })
    setService([''])
    setPrice([0, 1000000])
    setRating(undefined)
  }
  const handleSearchQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const checkFilters =
    filters.rating !== undefined ||
    filters.service[0] !== '' ||
    filters.price[0] !== 0 ||
    filters.price[1] !== 1000000

  return (
    <>
      <div className="lg:grid lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Container className="py-2 lg:py-4 bg-white">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="sr-only">Back</span>
              </button>
              <form
                onSubmit={handleSearchQuery}
                className={`relative mx-auto flex-1`}
              >
                <Input
                  type="text"
                  className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
                  placeholder="Search"
                  name="searchQuery"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 text-white rounded-r-md flex items-center justify-center bg-primary cursor-pointer"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </form>
              <div className="relative h-8 md:h-9 lg:hidden">
                <button
                  className="px-1.5 md:px-2 rounded-md border h-8 md:h-9"
                  onClick={() => setOpen(true)}
                >
                  <Sliders className="w-4 h-4" />
                </button>
                {checkFilters && (
                  <span className="w-2 h-2 bg-primary absolute -top-0.5 -right-0.5 rounded-full" />
                )}
              </div>
            </div>
          </Container>
          <div>
            <div className="relative">
              <Carousel
                opts={{
                  align: 'center',
                }}
                className="w-full h-max pl-2 md:pl-4 pr-1 md:pr-2 bg-white py-2 lg:py-4 border-t"
              >
                <CarouselContent className="pl-2">
                  {searchCategories.map(({ label, value }, index) => (
                    <CarouselItem key={index} className={`basis-auto pl-2`}>
                      <button
                        className={`flex items-center gap-3 md:gap-4 border  py-1 md:py-1.5 px-2 rounded-full w-max text-xs md:text-sm cursor-pointer font-medium ${value == category ? 'text-white bg-primary border-primary' : 'border-primary/20'}`}
                        onClick={() => handleSelectCategory(value)}
                      >
                        {label}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            {/* search results */}
            <div className="min-h-[50vh] bg-white border-t">
              {isLoading ? (
                <div className="h-24 py-10">
                  <Loading />
                </div>
              ) : isError ? (
                <div className="py-10">
                  <Error
                    text="Failed to load search results"
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

                  {!isLoading && resultCount === 0 && (
                    <NoResultFound
                      text="No results found"
                      subtitle="Try a different search or adjust your filters"
                      icon={Search}
                    />
                  )}

                  <div
                    ref={
                      category === 'providers' ? loadMoreRef : undefined
                    }
                  />
                  {category === 'providers' && providersHasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                      onClick={() => fetchProvidersNextPage()}
                    >
                      Load more
                    </button>
                  )}
                  {category === 'post' && postsHasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                      onClick={() => fetchPostsNextPage()}
                    >
                      Load more
                    </button>
                  )}
                  {category === 'offers' && offersHasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                      onClick={() => fetchOffersNextPage()}
                    >
                      Load more
                    </button>
                  )}
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
        </div>
        <div className="bg-gray-200 gap-0 lg:block lg:col-span-2 hidden  grid">
          <div className="bg-white py-2 lg:py-5 relative text-center">
            <h3 className="text-base lg:text-lg">Filter By </h3>
          </div>
          <div className="grid grid-cols-5 overflow-y-auto h-max min-h-52">
            <div className="bg-white col-span-2">
              {searchFilters.map(({ label, value }) => {
                return (
                  <button
                    key={value}
                    className={`w-full text-sm py-1.5 font-medium ${filterType == value && 'bg-gray-200'}`}
                    onClick={() => setFilterType(value)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="col-span-3 p-2 flex flex-col gap-2">
              <>
                {filterType === 'services' &&
                  serviceTypes.map(({ label, value }) => {
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={label}
                          checked={service.includes(value)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(value, checked as boolean)
                          }
                          className="border border-primary rounded-full"
                        />
                        <Label
                          htmlFor={label}
                          className="text-sm lg:text-base font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  })}
                {filterType === 'price' && (
                  <div className="space-y-4">
                    <span className="text-sm font-medium block">
                      Price Range
                    </span>
                    <div className="space-y-2">
                      <Slider
                        value={price}
                        onValueChange={(value) => setPrice(value)}
                        max={1000000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>
                          {currencyFormatter(price[0] || filters.price[0])}
                        </span>
                        <span>
                          {currencyFormatter(price[1] || filters.price[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {filterType === 'rating' &&
                  [5, 4, 3, 2, 1].map((value) => {
                    return (
                      <div
                        key={value}
                        className="flex items-center gap-2 justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`rating${value}`}
                            checked={rating == value}
                            onCheckedChange={() => setRating(value)}
                            className="rounded-full border border-primary w-4 h-4"
                          />
                          <Label htmlFor={`rating${value}`}>
                            <Ratings rating={value} />
                          </Label>
                        </div>
                        <span className="text-sm lg:text-base">{value}</span>
                      </div>
                    )
                  })}
              </>
            </div>
          </div>
          <div className="relative h-18 flex">
            <div className="w-[40%] bg-white absolute left-0 top-0 h-full" />
            <button
              className="text-white font-medium text-sm lg:text-base w-[95%] text-center bg-primary h-9 cursor-pointer rounded-md absolute -bottom-2 left-1/2 -translate-1/2"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <button
              className="absolute left-3 -top-1 text-sm md:text-base underline text-primary"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[85%] bg-gray-200 gap-0 lg:hidden"
        >
          <SheetHeader className="bg-white py-2 relative">
            <div className="text-center">
              <SheetTitle>Filter By </SheetTitle>
              <SheetDescription className="sr-only">
                filter search result
              </SheetDescription>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          </SheetHeader>
          <div className="grid grid-cols-5 h-full overflow-y-auto flex-1">
            <div className="bg-white flex flex-col items-center col-span-2">
              {searchFilters.map(({ label, value }) => {
                return (
                  <button
                    key={value}
                    className={` w-full text-sm py-1.5 font-medium ${filterType == value && 'bg-gray-200'}`}
                    onClick={() => setFilterType(value)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="col-span-3 p-2 flex flex-col gap-2">
              <>
                {filterType === 'services' &&
                  serviceTypes.map(({ label, value }) => {
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={label}
                          checked={service.includes(value)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(value, checked as boolean)
                          }
                          className="border border-primary rounded-full"
                        />
                        <Label
                          htmlFor={label}
                          className="text-sm lg:text-base font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  })}
                {filterType === 'price' && (
                  <div className="space-y-4">
                    <span className="text-sm font-medium block">
                      Price Range
                    </span>
                    <div className="space-y-2">
                      <Slider
                        value={price}
                        onValueChange={(value) => setPrice(value)}
                        max={1000000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>
                          {currencyFormatter(price[0] || filters.price[0])}
                        </span>
                        <span>
                          {currencyFormatter(price[1] || filters.price[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {filterType === 'rating' &&
                  [5, 4, 3, 2, 1].map((value) => {
                    return (
                      <div
                        key={value}
                        className="flex items-center gap-2 justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`rating${value}`}
                            checked={rating == value}
                            onCheckedChange={() => setRating(value)}
                            className="rounded-full border border-primary w-4 h-4"
                          />
                          <Label htmlFor={`rating${value}`}>
                            <Ratings rating={value} />
                          </Label>
                        </div>
                        <span className="text-sm lg:text-base">{value}</span>
                      </div>
                    )
                  })}
              </>
            </div>
          </div>
          <SheetFooter className="relative h-14 flex">
            <div className="w-[40%] bg-white absolute left-0 top-0 h-full" />
            <button
              className="text-white font-medium text-sm lg:text-base w-[95%] text-center bg-primary h-9 cursor-pointer rounded-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-1/2"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <button
              className="absolute left-3 -top-4 text-sm md:text-base underline text-primary"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
