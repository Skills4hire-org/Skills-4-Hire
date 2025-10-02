import { NavLink } from 'react-router-dom'

export default function CustomerHomeNavbar() {
  return (
    <nav className="border-b max-w-4xl lg:w-[65%]">
      <div className="flex justify-center gap-36  ">
        <NavLink
          to="posts"
          className={({ isActive }) =>
            `py-3 text-sm font-medium relative ${
              isActive
                ? 'text-[#222BDE] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-1 after:bg-[#222BDE] after:rounded-full'
                : 'text-gray-500'
            }`
          }
        >
          Posts
        </NavLink>
        <NavLink
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
        </NavLink>
      </div>
    </nav>
  )
}
