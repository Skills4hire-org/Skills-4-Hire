import { NavLink } from 'react-router-dom'

export default function ProfessionalSectionTabs() {
  return (
    <nav
      aria-label="Professional sections"
      className="flex border-b border-gray-200"
    >
      <NavLink
        to="/professional/network"
        className={({ isActive }) =>
          `min-h-12 flex-1 border-b-2 px-4 py-3 text-center text-sm font-semibold transition-colors ${
            isActive
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`
        }
      >
        My Network
      </NavLink>
      <NavLink
        to="/professional/overview"
        className={({ isActive }) =>
          `min-h-12 flex-1 border-b-2 px-4 py-3 text-center text-sm font-semibold transition-colors ${
            isActive
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`
        }
      >
        Overview
      </NavLink>
    </nav>
  )
}