import {
  customerHomeNavLinks,
  serviceProviderHomeNavLinks,
} from '@/assets/data'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function HomeNavbar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  )
  const navLinks =
    userType == 'customer' ? customerHomeNavLinks : serviceProviderHomeNavLinks
  return (
    <nav className="border-b ">
      <div className="flex gap-8 justify-evenly">
        {navLinks.map(({ label, url }) => (
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
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
