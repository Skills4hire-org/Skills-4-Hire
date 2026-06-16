import { Bell, MessageSquareMore } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import ProfileImage from '../global/ProfileImage'
import SearchBar from '../global/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import type { UserData } from '@/types/user.types'

export default function DesktopHomeHeader() {
  const {
    userType,
    user_data,
    avatar,
  }: { userType: UserType; user_data: UserData; avatar: string } = useSelector(
    (state: any) => state.userState,
  )
  const is_active = navigator.onLine
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = () => {
    navigate(`/${userType}/search?query=${searchQuery}`)
  }
  const searchPlaceholder =
    userType == 'customer' ? 'Search for plumbers, electricians...' : 'Search'

  return (
    <header className="hidden md:block py-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 items-center max-w-4xl rounded-lg">
          <SearchBar
            placeholder={searchPlaceholder}
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
            <ProfileImage
              size="size-10"
              is_active={is_active}
              avatar={avatar}
            />
            <h1 className="text-sm font-semibold capitalize">
              {user_data?.profile.display_name}
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}
