import {
  customerHomeNavLinks,
  serviceProviderHomeNavLinks,
} from '@/assets/data'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useHireRequestNotificationCount, useJobNotificationCount } from '@/hooks/useNotifications'

export default function HomeNavbar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const navLinks =
    userType == 'customer' ? customerHomeNavLinks : serviceProviderHomeNavLinks

  const { count: hireRequestCount } = useHireRequestNotificationCount()
  const { count: jobCount } = useJobNotificationCount()

  const countForLabel = (label: string): number => {
    if (label === 'Hire requests') return hireRequestCount
    if (label === 'Jobs') return jobCount
    return 0
  }

  return (
    <nav className="border-b h-11 pt-2 bg-white lg:bg-gray-100 md:rounded-2xl">
      <div className="flex gap-8 justify-evenly">
        {navLinks.map(({ label, url }) => {
          const count = countForLabel(label)
          return (
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
              {count > 0 && (
                <span className="ml-1 bg-red-600 text-white text-[10px] leading-3.5 min-w-4 h-4 px-1 rounded-full inline-flex items-center justify-center font-semibold align-middle">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
