import { favoritesNavLinks } from '@/assets/data'
import { NavLink } from 'react-router-dom'

export default function FavoritesNavbar() {
  return (
    <nav className="border-b ">
      <div className="grid grid-cols-2">
        {favoritesNavLinks.map(({ label, url }) => (
          <NavLink
            key={label}
            to={url}
            className={({ isActive }) =>
              `py-2 text-sm md:text-base text-center border-b-2 font-medium  ${
                isActive
                  ? 'text-primary border-b-primary'
                  : 'text-muted-foreground border-b-muted-foreground'
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
