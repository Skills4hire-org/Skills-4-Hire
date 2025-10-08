import { Bell, MessageSquareMore } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import ProfileImage from '../global/ProfileImage'
import SearchBar from '../global/SearchBar'

export default function DesktopHomeHeader() {
  return (
    <header className="hidden md:block py-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 items-center max-w-4xl rounded-lg">
          <SearchBar
            placeholder="Search for jobs, services or providers"
            maxWidth="max-w-md"
          />
        </div>
        <div className="flex items-center gap-4">
          <RecentNotification icon={Bell} newAlert />
          <RecentNotification icon={MessageSquareMore} newAlert />

          <div className="flex items-center gap-2">
            <ProfileImage />
            <h1 className="text-sm font-semibold">Leo Justin</h1>
          </div>
        </div>
      </div>
    </header>
  )
}
