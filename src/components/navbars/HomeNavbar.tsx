import {
  customerHomeNavLinks,
  serviceProviderHomeNavLinks,
} from '@/assets/data'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useUnreadNotificationCount } from '@/hooks/useNotifications'

export default function HomeNavbar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const navLinks =
    userType == 'customer' ? customerHomeNavLinks : serviceProviderHomeNavLinks
  const { count: unreadCount } = useUnreadNotificationCount()
  return (
    <nav className="border-b h-11 pt-2">
      <div className="flex gap-8 justify-evenly">
        {navLinks.map(({ label, url, hasNotification }) => (
          <NavLink
            key={label}
            to={url}
            className={({ isActive }) =>
              `py-2 text-sm md:text-base relative ${
                isActive
                  ? 'text-black font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-1 after:bg-primary after:rounded-full'
                  : 'text-gray-500 font-medium'
              }`
            }
          >
            {label}
            {hasNotification && unreadCount > 0 && (
              <span className="absolute -top-0.5 lg:top-0.5 -right-3 min-w-4 h-4 px-1 bg-red-600 text-white text-[10px] leading-4 text-center rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
