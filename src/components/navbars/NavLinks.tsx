import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

interface NavLinkProps {
  url: string
  icon: string
  label: string
  active: boolean
  activeIcon: string
}

export default function NavLinks({
  label,
  url,
  icon,
  active,
  activeIcon,
}: NavLinkProps) {
  return (
    <NavLink
      key={label}
      to={url}
      className={` text-white/60 capitalize flex flex-col items-center gap-0.5
              
            `}
    >
      <div className="w-5 h-5">
        <Icon
          icon={active ? activeIcon : icon}
          className={`w-5 h-5 transition duration-150 ${
            active ? 'text-primary' : 'text-gray-600'
          }`}
        />
      </div>

      <span
        className={` text-xs transition duration-150 font-medium ${
          active ? 'text-primary' : 'text-gray-600'
        }`}
      >
        {label}
      </span>
    </NavLink>
  )
}
