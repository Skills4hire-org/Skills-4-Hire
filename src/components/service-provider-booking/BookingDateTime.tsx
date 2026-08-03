import Container from '../global/Container'
import SectionHeading from './SectionHeading'
import ServiceProviderBookingCard from '../service-provider/ServiceProviderBookingCard'
import { useSelector } from 'react-redux'
import ServiceProviderServicesCard from '../service-provider/ServiceProviderServicesCard'
import { Plus, X } from 'lucide-react'
import BookingDateTimeForm from '../form/BookingDateTimeForm'
import { useState } from 'react'
import type { Profile, Service } from '@/types/user.types'
import { useUserServices } from '@/hooks/useUsers'
import EmptyTab from '../service-provider/EmptyTab'
import Loading from '../global/Loading'
import Error from '../global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function BookingDateTime({
  serviceProvider,
}: {
  serviceProvider: Profile | undefined
}) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useUserServices({ id: serviceProvider?.user?.user_id })
  const allServices: Service[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const [showAllServices, setShowAllServices] = useState(false)
  const { services }: { services: Service[] } = useSelector(
    (state: any) => state.bookingState,
  )
  const servicesIds = services.map((service) => service.service_id)
  const handleServicesFetchingError = () => {
    refetch()
  }
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <>
      <SectionHeading title="Services selected" />
      <Container>
        {serviceProvider && (
          <div className="grid grid-cols-1 mb-4">
            <ServiceProviderBookingCard {...serviceProvider} />
          </div>
        )}
        <div className={`space-y-4 mb-4 `}>
          {services.length !== 0 ? (
            services.map((service) => (
              <ServiceProviderServicesCard
                key={service.service_id}
                {...service}
                check
              />
            ))
          ) : (
            <div className="py-10">
              <EmptyTab label="service selected" />
            </div>
          )}
        </div>

        {showAllServices && (
<<<<<<< HEAD
          <>
            {isLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {isError && !data ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load services"
                      buttonFunc={handleServicesFetchingError}
                    />
                  </div>
                ) : (
                  <>
                    {allServices.length !== 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {allServices
                          ?.filter(
                            (service) =>
                              !servicesIds.includes(service.service_id),
                          )
                          ?.map((service) => (
                            <ServiceProviderServicesCard
                              check={true}
                              key={service.service_id}
                              {...service}
                              isDeleteable={false}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="mb-4 py-10">
                        <EmptyTab label="services available" />
                      </div>
                    )}

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
                        Load more services
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
          </>
=======
          <div className={`space-y-4 ${!serviceProvider && 'mb-4'}`}>
            {!serviceProvider?.services ||
              serviceProvider?.services
                .filter((service) => !servicesIds.includes(service.service_id))
                ?.map((service) => (
                  <ServiceProviderServicesCard
                    key={service.service_id}
                    {...service}
                    check
                  />
                ))}
          </div>
>>>>>>> 742d06b4538a2774e5bab469cd60a9341e843331
        )}

        <div className="text-center">
          {showAllServices ? (
            <button
              className="rounded-full text-center bg-destructive text-white md:py-0.5 px-3.5"
              onClick={() => setShowAllServices(false)}
            >
              <X strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="sr-only">hide services</span>
            </button>
          ) : (
            <button
              className="rounded-full text-center bg-primary text-white md:py-0.5 px-3.5 "
              onClick={() => setShowAllServices(true)}
            >
              <Plus strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="sr-only">show all services</span>
            </button>
          )}
        </div>
      </Container>
      <SectionHeading title="Details" />
      <Container>
        <BookingDateTimeForm />
      </Container>
    </>
  )
}
