import { Bell, MessageSquareMore } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import ProfileImage from '../global/ProfileImage'
import SearchBar from '../global/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function DesktopHomeHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = () => {
    navigate(`/${userType}/search?query=${searchQuery}`)
  }
  return (
    <header className="hidden md:block py-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 items-center max-w-4xl rounded-lg">
          <SearchBar
            placeholder="Search for plumbers, electricians..."
            maxWidth="max-w-md"
            value={searchQuery}
            onSubmit={handleSearchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to="/customer/notification">
            <RecentNotification icon={Bell} newAlert />
          </Link>
          <RecentNotification icon={MessageSquareMore} newAlert />

          <div className="flex items-center gap-2">
            <ProfileImage size="size-10" />
            <h1 className="text-sm font-semibold">Leo Justin</h1>
          </div>
        </div>
      </div>
    </header>
  )
}
