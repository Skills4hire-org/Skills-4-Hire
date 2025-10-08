import { customerHomeNavbar } from '@/assets/data'
import { NavLink } from 'react-router-dom'

export default function CustomerHomeNavbar() {
  return (
    <nav className="border-b ">
      <div className="flex gap-8 justify-evenly">
        {customerHomeNavbar.map(({ label, url }) => (
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
