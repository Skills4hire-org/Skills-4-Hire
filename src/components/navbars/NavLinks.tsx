import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

interface NavLinkProps {
  url: string
  icon: string
  label: string
  active: boolean
  activeIcon: string
  badge?: number
}

export default function NavLinks({
  label,
  url,
  icon,
  active,
  activeIcon,
  badge = 0,
}: NavLinkProps) {
  return (
    <NavLink
      key={label}
      to={url}
      className="text-white/60 capitalize flex flex-col items-center gap-0.5 relative pt-2"
    >
      {/* Active indicator line on top */}
      <span
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-150 ${
          active ? 'w-15 opacity-100' : 'w-0 opacity-0'
        }`}
      />

      <div className="w-5 h-5 relative">
        <Icon
          icon={active ? activeIcon : icon}
          className={`w-5 h-5 transition duration-150 ${
            active ? 'text-primary' : 'text-gray-600'
          }`}
        />
        {badge > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[9px] leading-3 min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center font-semibold">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>

      <span
        className={`text-xs transition duration-150 font-medium ${
          active ? 'text-primary' : 'text-gray-600'
        }`}
      >
        {label}
      </span>
    </NavLink>
  )
}
