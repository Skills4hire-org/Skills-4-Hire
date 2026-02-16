import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

interface NavLinkProps {
  url: string
  icon: string
  label: string
  active: boolean
}

export default function NavLinks({ label, url, icon, active }: NavLinkProps) {
  return (
    <NavLink
      key={label}
      to={url}
      className={` text-white/60 capitalize flex flex-col items-center
              
            `}
    >
      <div
        className={` w-10 h-10  rounded-full flex items-center justify-center transition duration-150  ${
          active && '-translate-y-4.5 outline-4 outline-gray-200/80 bg-primary'
        }`}
      >
        <Icon
          icon={icon}
          className={`w-6 h-6 transition duration-150 ${
            active ? 'text-white' : 'text-gray-600'
          }`}
        />
      </div>

      <span
        className={`-mt-3 text-sm transition duration-150 font-medium ${
          active ? 'text-primary' : 'text-gray-600'
        }`}
      >
        {label}
      </span>
    </NavLink>
  )
}
