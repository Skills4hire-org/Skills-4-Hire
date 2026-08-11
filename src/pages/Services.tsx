import MobileServicesOverviewHeader from '@/components/header/MobileServicesOverviewHeader'
import SectionHeading from '@/components/services/SectionHeading'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ReferAndEarnBanner from '@/components/services/ReferAndEarnBanner'
import DesktopServicesOverviewHeader from '@/components/header/DesktopServicesOverviewHeader'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useAllProviders } from '@/hooks/useUsers'
import type { Provider } from '@/types/user.types'
import { useFavourites } from '@/hooks/useFavourites'
import type { Favorite } from '@/types/favourites.type'
import { vocationalCategories, digitalCategories } from '@/data/staticServices'
import type { ServiceCategory } from '@/data/staticServices'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

// Show a mixed preview: first 3 vocational + first 3 digital
const previewCategories = [
  ...vocationalCategories.slice(0, 3),
  ...digitalCategories.slice(0, 3),
]

function PreviewCard({ id, name, image, roles }: ServiceCategory) {
  const [imgError, setImgError] = useState(false)
  return (
    <Link to={`/customer/services/available-services/${id}`} className="block h-full">
      <div className="bg-white border border-neutral-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[160px]">
        <div>
          <h3 className="text-neutral-900 font-bold text-xs sm:text-sm capitalize line-clamp-2 mb-1 leading-snug">
            {name}
          </h3>
          <p className="text-xs text-neutral-400 mb-2">{roles.length} specialist{roles.length !== 1 ? 's' : ''}</p>
        </div>
        <figure className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
          {image && !imgError ? (
            <img src={image} alt={name} className="rounded-xl object-cover w-full h-full" loading="lazy" onError={() => setImgError(true)} />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <ImageIcon className="w-7 h-7 text-neutral-300" />
            </div>
          )}
        </figure>
      </div>
    </Link>
  )
}

export default function Services() {
  const {
    data: providers,
    isLoading: providersLoading,
    isError: providersError,
    refetch: refetchProviders,
  } = useAllProviders({})

  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    isError: favouritesError,
  } = useFavourites()

  const favourites: Favorite[] =
    favoritesData?.pages?.flatMap(
      (page) => page?.data?.results ?? page?.results ?? [],
    ) ?? []

  const allFavourites =
    favourites?.flatMap((favourite) => favourite?.providers ?? []) ?? []
  const providersID =
    allFavourites?.map((fav) => fav?.provider_id).filter(Boolean) ?? []
  const favoriteID =
    favourites
      ?.flatMap((favourite) => favourite?.favourite_id ?? [])
      .filter(Boolean) ?? []

  const professionals: Provider[] =
    providers?.pages?.flatMap(
      (page) => page?.data?.results ?? page?.results ?? [],
    ) ?? []

  const handleProviderFetchingError = () => {
    refetchProviders()
  }

  return (
    <div className="space-y-2 md:space-y-6 lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <Container className="bg-white">
        <MobileServicesOverviewHeader />
        <DesktopServicesOverviewHeader />
      </Container>

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
                  className="absolute top-1/2 -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </Link>
          </div>

          <section className="space-y-3 pb-1.5 min-h-32">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Available services" />
              <Link
                to="available-services"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x snap-mandatory">
              {previewCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-none w-[160px] md:w-[200px] snap-start"
                >
                  <PreviewCard {...cat} />
                </div>
              ))}
            </div>
          </section>

          <ReferAndEarnBanner />

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Professionals for you" />
              <Link
                to="professionals"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            {providersLoading || favoritesLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {providersError || favouritesError ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load professionals"
                      buttonFunc={handleProviderFetchingError}
                      buttonText="Retry"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-1">
                    {professionals?.slice(0, 4).map((professional) => {
                      if (!professional?.provider_id) return null
                      return (
                        <ServiceProviderCard
                          key={professional.provider_id}
                          {...professional}
                          providerIDs={providersID}
                          favouriteID={favoriteID[0]}
                        />
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </Container>
    </div>
  )
}
