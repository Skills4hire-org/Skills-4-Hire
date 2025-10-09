import { favoritesTabList } from '@/assets/data'
import FavoritesTabContent from '@/components/favorites/FavoritesTabContent'
import Container from '@/components/global/Container'
import TabHead from '@/components/global/TabHead'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import { Tabs } from '@/components/ui/tabs'

export default function Favorites() {
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Favorites" />
      </Container>
      <Container>
        <Tabs defaultValue="favorite-services">
          <TabHead tabList={favoritesTabList} />
          <FavoritesTabContent />
        </Tabs>
        <></>
      </Container>
    </div>
  )
}
