import NoFavoriteCard from '@/components/favorites/NoFavoriteCard'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { useFavourites } from '@/hooks/useFavourites'
import type { Favorite } from '@/types/favourites.type'

export default function Favorites() {
  const { data, isLoading, isError, refetch } = useFavourites()
  
  // Safely guard both 'page' and 'page.data' using fallback arrays
  const favourites: Favorite[] =
    data?.pages?.flatMap((page) => page?.data?.results ?? page?.results ?? []) ?? []

  // Added optional chaining here to prevent nested property runtime crashes
  const allFavourites = favourites?.flatMap((favourite) => favourite?.providers ?? []) ?? []
  const providersID = allFavourites?.map((provider) => provider?.provider_id).filter(Boolean) ?? []
  const favoriteID = favourites?.flatMap((favourite) => favourite?.favourite_id ?? []).filter(Boolean) ?? []

  const handleFavouritesFetchingError = () => {
    refetch()
  }

  return (
    <div className="space-y-2 md:space-y-4 lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Favorites" />
      </Container>
      <Container>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-6">
                <Error
                  text="Failed to load your favorite skilled professionals"
                  buttonFunc={handleFavouritesFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
                  {allFavourites?.map((favourite) => {
                    // Skip rendering this item if it lacks a valid provider_id
                    if (!favourite?.provider_id) return null;
                    
                    return (
                      <ServiceProviderCard
                        key={favourite.provider_id}
                        {...favourite}
                        providerIDs={providersID}
                        favouriteID={favoriteID[0]}
                      />
                    );
                  })}
                </div>

                {allFavourites?.length === 0 && <NoFavoriteCard />}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
