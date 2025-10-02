import { Bell, MessageSquareMore } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import ProfileImage from '../global/ProfileImage'
import SearchBar from '../global/SearchBar'

export default function DesktopHomeHeader() {
  return (
    <header className="hidden md:block py-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 items-center max-w-4xl rounded-lg">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <RecentNotification size="lg" icon={Bell} />
          <RecentNotification size="lg" icon={MessageSquareMore} />

          <div className="flex items-center gap-2">
            <ProfileImage size="lg" />

            <div className="">
              <p className="text-sm font-semibold">Leo Justin</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
