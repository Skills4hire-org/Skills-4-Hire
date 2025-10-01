import { customerNavLinks, serviceProviderNavLinks } from '@/assets/data'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function UserNavbar() {
  const [userRole, setUserRole] = useState<'customer' | 'service-provider'>(
    'customer'
  )
  const pathname = useLocation().pathname
  const navLinks =
    userRole === 'customer' ? customerNavLinks : serviceProviderNavLinks

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background  ">
      <div className="relative bg-primary flex items-center justify-evenly h-18 mt-6.5 ">
        {navLinks.map(({ url, icon, label }) => {
          const active = pathname === url
          const IconComponent = icon
          return (
            <NavLink
              key={label}
              to={url}
              className={` text-white/50 capitalize flex flex-col items-center
              
            `}
            >
              <div
                className={` w-10 h-10  rounded-full flex items-center justify-center  bg-primary transition duration-150  ${
                  active && '-translate-y-7 outline-8 outline-background'
                } `}
              >
                <IconComponent
                  className={`w-5 h-5 transition duration-150 ${
                    active && 'text-white'
                  }`}
                />
              </div>

              <span
                className={`-mt-2 text-sm transition duration-150 ${
                  active && 'text-white'
                }`}
              >
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
