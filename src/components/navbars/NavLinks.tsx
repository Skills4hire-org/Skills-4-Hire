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
        className={` w-10 h-10  rounded-full flex items-center justify-center  bg-primary transition duration-150  ${
          active && '-translate-y-4.5 outline-4 outline-background'
        } `}
      >
        <Icon
          icon={icon}
          className={`w-5 h-5 transition duration-150 ${
            active && 'text-white'
          }`}
        />
      </div>

      <span
        className={`-mt-3 text-sm transition duration-150 ${
          active && 'text-white'
        }`}
      >
        {label}
      </span>
    </NavLink>
  )
}
