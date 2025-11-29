import NoFavoriteCard from '@/components/favorites/NoFavoriteCard'
import Container from '@/components/global/Container'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { user } from '@/utils/database'

export default function Favorites() {
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Favorites" />
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
          {user?.favorites.map((favorite) => (
            <ServiceProviderCard key={favorite.id} {...favorite} />
          ))}
        </div>

        {user?.favorites.length === 0 && <NoFavoriteCard />}
      </Container>
    </div>
  )
}
