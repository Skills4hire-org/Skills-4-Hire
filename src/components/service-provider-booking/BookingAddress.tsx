import SectionHeading from './SectionHeading'
import Container from '../global/Container'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { workTypes } from '@/assets/data'
import { handleBookingInfo, handleSteps } from '@/features/booking/bookingSlice'
import SavedAddressCard from './SavedAddressCard'
import type { Address, BookingInfo } from '@/types/bookings.type'
import { useMyAddress } from '@/hooks/useBookings'
import Loading from '../global/Loading'
import Error from '../global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import EmptyTab from '../service-provider/EmptyTab'
import AddressForm from '../form/AddressForm'

export default function BookingAddress() {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState,
  )
  const workType = info.is_remote ? 'remote' : 'onsite'
  const dispatch = useDispatch()
  const selectWorkType = (type: string) => {
    dispatch(
      handleBookingInfo({
        info: {
          is_remote: type == 'remote',
        },
      }),
    )
  }
  const handleStep = (step: number) => {
    dispatch(handleSteps({ step }))
  }

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useMyAddress()

  const savedAddresses: Address[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const handleAddressFetchingError = () => {
    refetch()
  }

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleNext = () => {
    if (info.is_remote) {
      dispatch(
        handleBookingInfo({
          info: {
            address: null,
          },
        }),
      )
    }

    handleStep(3)
  }

  return (
    <>
      <Container>
        <div className="flex items-center gap-10 justify-start md:justify-center md:gap-14">
          {workTypes.map((type) => {
            return (
              <div
                key={type}
                className="flex items-center gap-1.5"
                onClick={() => selectWorkType(type)}
              >
                <Button
                  variant={`${workType === type ? 'default' : 'outline'}`}
                  className="rounded-full w-3 h-3 p-0 transition"
                >
                  <span className="sr-only">{type}</span>
                </Button>
                <span className="text-sm capitalize">{type}</span>
              </div>
            )
          })}
        </div>
      </Container>

      <SectionHeading title="Enter Address" />
      <Container>
        <AddressForm is_remote={info.is_remote} />
      </Container>
      <SectionHeading title="Saved Address" />
      <Container>
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
                    text="Failed to load saved addresses"
                    buttonFunc={handleAddressFetchingError}
                  />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    {savedAddresses?.length == 0 ? (
                      <EmptyTab label="saved addresses" />
                    ) : (
                      savedAddresses?.map((address) => (
                        <SavedAddressCard
                          key={address.address_id}
                          address={address}
                        />
                      ))
                    )}
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
                      Load more addresses
                    </button>
                  )}
                  {isFetchNextPageError && (
                    <Error
                      text="Failed to load more addresses"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      </Container>
      <div className="text-center space-x-6 md:space-x-10 mt-8 md:mb-8">
        <Button
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          onClick={() => handleStep(1)}
        >
          Previous
        </Button>
        <Button
          type="submit"
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          disabled={(workType === 'onsite' && !info.address) || isLoading}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  )
}
