import { customerHomeNavbar } from '@/assets/data'
import { NavLink } from 'react-router-dom'

export default function CustomerHomeNavbar() {
  return (
    <nav className="border-b max-w-4xl">
      <div className="flex justify-center gap-36  ">
        {customerHomeNavbar.map(({ label, url }) => (
          <NavLink
            key={label}
            to={url}
            className={({ isActive }) =>
              `py-2 md:pt-3 text-sm font-medium relative ${
                isActive
                  ? 'text-black after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-1 after:bg-primary after:rounded-full'
                  : 'text-gray-500'
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        {/* <NavLink
          to="my-offers"
          className={({ isActive }) =>
            `py-3 text-sm font-medium relative ${
              isActive
                ? 'text-[#222BDE] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-14 after:h-1 after:bg-[#222BDE] after:rounded-full'
                : 'text-gray-500'
            }`
          }
        >
          My Offers
        </NavLink> */}
      </div>
    </nav>
  )
}
