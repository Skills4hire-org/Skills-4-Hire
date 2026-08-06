import {
  customerHomeNavLinks,
  serviceProviderHomeNavLinks,
} from '@/assets/data'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useHireRequestNotificationCount } from '@/hooks/useNotifications'
import { useNewHireRequestsCount } from '@/hooks/useNewHireRequests'

export default function HomeNavbar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const navLinks =
    userType == 'customer' ? customerHomeNavLinks : serviceProviderHomeNavLinks
  const { count: hireRequestCount } = useHireRequestNotificationCount()
  const { count: newHireRequestsCount } = useNewHireRequestsCount({
    enabled: userType === 'service_provider',
  })
  const showHireNotificationDot =
    hireRequestCount > 0 || newHireRequestsCount > 0
  return (
    <nav className="border-b h-11 pt-2 bg-white lg:bg-accent md:rounded-2xl">
      <div className="flex gap-8 justify-evenly">
        {navLinks.map(({ label, url, hasNotification }) => (
          <NavLink
            key={label}
            to={url}
            className={({ isActive }) =>
              `py-2 text-sm md:text-base relative ${
                isActive
                  ? 'text-black font-bold after:absolute after:bottom-0 lg:after:bottom-1 max-[1023px]:min-[768px]:after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-1 after:bg-primary after:rounded-full'
                  : 'text-gray-500 font-medium'
              }`
            }
          >
            {label}
            {hasNotification && showHireNotificationDot && (
              <span className="absolute -top-0.5 lg:top-0.5 -right-3 min-w-2.5 h-2.5 rounded-full bg-red-600" />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
