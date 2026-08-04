import { useMemo, useState } from 'react'
import { Briefcase, Sliders } from 'lucide-react'
import Container from '@/components/global/Container'
import RequestCard from '@/components/overview/RequestCard'
import { useHireRequests } from '@/hooks/usePosts'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import NoJobsFound from '@/components/global/NoResultFound'
import FilterModal from '@/components/home/FilterModal'
import SortDropdown from '@/components/home/SortDropdown'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { carouselServices } from '@/assets/data'
import type { Post } from '@/types/post.types'

export default function Request() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    serviceType: '',
    minAmount: '',
    maxAmount: '',
    state: '',
    city: '',
  })
  const [sortType, setSortType] = useState('')

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useHireRequests({
    tags_name: filters.serviceType,
    city: filters.city,
    state: filters.state,
    min_amount: filters.minAmount,
    max_amount: filters.maxAmount,
  })

  const filteredRequests = useMemo(() => {
    const requests: Post[] =
      data?.pages
        .flatMap((page) => page?.results ?? [])
        .filter((post) => post?.post_type?.toUpperCase() === 'JOB') ?? []

    const serviceType = filters.serviceType.trim().toLowerCase()
    const minAmount = filters.minAmount ? Number(filters.minAmount) : null
    const maxAmount = filters.maxAmount ? Number(filters.maxAmount) : null

    return requests.filter((post) => {
      if (serviceType) {
        const tag = (post.tags?.[0]?.name ?? '').trim().toLowerCase()
        if (tag !== serviceType) return false
      }
      if (filters.city && (post.city ?? '') !== filters.city) return false
      if (filters.state && (post.state ?? '') !== filters.state) return false
      const amount = Number(post.amount) || 0
      if (minAmount !== null && amount < minAmount) return false
      if (maxAmount !== null && amount > maxAmount) return false
      return true
    })
  }, [data, filters])

  const sortedRequests = useMemo(() => {
    return [...filteredRequests].sort((a, b) => {
      const aAmount = Number(a.amount)
      const bAmount = Number(b.amount)
      const aDate = new Date(a.updated_at).getTime()
      const bDate = new Date(b.updated_at).getTime()

      switch (sortType) {
        case 'newest':
          return bDate - aDate
        case 'oldest':
          return aDate - bDate
        case 'highest':
          return bAmount - aAmount
        case 'lowest':
          return aAmount - bAmount
        default:
          return 0
      }
    })
  }, [filteredRequests, sortType])

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const hasActiveFilters = Object.values(filters).some(Boolean)

  const services = carouselServices.map((service) => service.text)

  return (
    <div className="lg:px-4">
      <Container>
        <div className="w-full flex flex-col gap-2 md:gap-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-2 w-full">
            <h2 className="font-bold text-sm md:text-base text-gray-900 ml-1 lg:ml-0">
              Hire Requests
            </h2>
            <div className="flex items-center gap-2 md:gap-3 mr-1 lg:mr-0">
              <button
                onClick={() => setFilterOpen(true)}
                className="
                  relative
                  inline-flex
                  items-center
                  gap-2
                  h-[36px]
                  px-4
                  rounded-md
                  bg-white
                  border border-gray-200
                  text-xs md:text-sm
                  shadow-sm
                  hover:bg-gray-50
                  hover:border-gray-200
                  transition cursor-pointer
                "
                disabled={isLoading}
              >
                <Sliders className="w-4 h-4" />
                Filter
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
                )}
              </button>
              <SortDropdown value={sortType} setValue={setSortType} />
            </div>
          </div>

          <FilterModal
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
            services={services}
            title="Filter Requests"
          />

          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : isError && !data ? (
            <div className="py-10">
              <Error text="Failed to load hire requests" buttonFunc={refetch} />
            </div>
          ) : sortedRequests.length === 0 ? (
            <div className="py-10">
              <NoJobsFound
                icon={Briefcase}
                text="No hire requests found"
                subtitle={
                  hasActiveFilters
                    ? 'Try adjusting your filters or reset them'
                    : undefined
                }
              />
            </div>
          ) : (
            <>
              {sortedRequests.map((post) => (
                <RequestCard key={post.post_id} post={post} />
              ))}
              <div ref={loadMoreRef} />
              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
              {hasNextPage && (
                <button
                  className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </button>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more hire requests"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
