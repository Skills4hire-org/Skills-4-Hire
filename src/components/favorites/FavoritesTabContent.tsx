import { favoritesTabList } from '@/assets/data'
import { TabsContent } from '../ui/tabs'
import NoFavoriteCard from './NoFavoriteCard'

export default function FavoritesTabContent() {
  return (
    <>
      {favoritesTabList.map(({ status, label }) => (
        <TabsContent key={status} value={status}>
          <NoFavoriteCard label={label} />
        </TabsContent>
      ))}
    </>
  )
}
