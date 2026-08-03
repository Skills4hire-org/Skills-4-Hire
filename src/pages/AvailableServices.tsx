import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServicesCard from '@/components/services/ServicesCard'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useAllServices } from '@/hooks/useServices'
import type { Service } from '@/types/services.types'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function ServicesTabGrid({
  services,
  isLoading,
  isError,
  handleFetchingError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
}: {
  services: Service[]
  isLoading: boolean
  isError: boolean
  handleFetchingError: () => void
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  isFetchNextPageError: boolean
}) {
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <div className="space-y-2 md:space-y-4">
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {isError && services.length === 0 ? (
            <div className="h-24">
              <Error
                text="Failed to load services"
                buttonFunc={handleFetchingError}
                buttonText="Retry"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                {services?.map((service) => (
                  <ServicesCard key={service.service_id} {...service} />
                ))}
              </div>

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
                  text="Failed to load more services"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default function AvailableServices() {
  const {
    data: vocationalServices,
    isLoading: vocationalServicesLoading,
    isError: vocationalServicesError,
    refetch: vocationalServicesRefetch,
    fetchNextPage: vocationalServicesFetchNextPage,
    hasNextPage: vocationalServicesHasNextPage,
    isFetchingNextPage: vocationalServicesIsFetchingNextPage,
    isFetchNextPageError: vocationalServicesIsFetchingNextPageError,
  } = useAllServices({ category: 'vocational' })

  const {
    data: digitalServices,
    isLoading: digitalServicesLoading,
    isError: digitalServicesError,
    refetch: digitalServicesRefetch,
    fetchNextPage: digitalServicesFetchNextPage,
    hasNextPage: digitalServicesHasNextPage,
    isFetchingNextPage: digitalServicesIsFetchingNextPage,
    isFetchNextPageError: digitalServicesIsFetchingNextPageError,
  } = useAllServices({ category: 'digital' })

  const vocationalServicesList: Service[] =
    vocationalServices?.pages.flatMap((page) => page?.results ?? []) ?? []

  const handleVocationalServiceFetchingError = async () => {
    if (!vocationalServices) {
      vocationalServicesRefetch()
    } else {
      vocationalServicesFetchNextPage()
    }
  }

  const digitalServicesList: Service[] =
    digitalServices?.pages.flatMap((page) => page?.results ?? []) ?? []

  const handleDigitalServiceFetchingError = async () => {
    if (!digitalServices) {
      digitalServicesRefetch()
    } else {
      digitalServicesFetchNextPage()
    }
  }

  return (
    <div className="space-y-2 md:space-y-6 lg:ml-17">
      <HeaderWithBackNavigation title="Available services" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <div>
            <Link to="/customer/services/search">
              <div className={`relative w-full mx-auto`}>
                <Input
                  type="text"
                  className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
                  placeholder="Search for services"
                  name="searchQuery"
                  id="searchQuery"
                />
                <button
                  type="submit"
                  className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </Link>
          </div>

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
              <ServicesTabGrid
                services={vocationalServicesList}
                isLoading={vocationalServicesLoading}
                isError={vocationalServicesError}
                handleFetchingError={handleVocationalServiceFetchingError}
                fetchNextPage={vocationalServicesFetchNextPage}
                hasNextPage={vocationalServicesHasNextPage}
                isFetchingNextPage={vocationalServicesIsFetchingNextPage}
                isFetchNextPageError={vocationalServicesIsFetchingNextPageError}
              />
            </TabsContent>

            <TabsContent value="digital" className="mt-4 md:mt-6">
              <ServicesTabGrid
                services={digitalServicesList}
                isLoading={digitalServicesLoading}
                isError={digitalServicesError}
                handleFetchingError={handleDigitalServiceFetchingError}
                fetchNextPage={digitalServicesFetchNextPage}
                hasNextPage={digitalServicesHasNextPage}
                isFetchingNextPage={digitalServicesIsFetchingNextPage}
                isFetchNextPageError={digitalServicesIsFetchingNextPageError}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
