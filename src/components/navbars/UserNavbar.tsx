import { customerMobileNavLinks, serviceProviderNavLinks } from '@/assets/data'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Container from '../global/Container'
import { getBasePath } from '@/utils/format'

export default function UserNavbar() {
  const [userRole, setUserRole] = useState<'customer' | 'service-provider'>(
    'customer'
  )
  const pathname = useLocation().pathname
  const basePath = getBasePath(pathname)

  const navLinks =
    userRole === 'customer' ? customerMobileNavLinks : serviceProviderNavLinks

  return (
    <Container>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background md:hidden  ">
        <div className="relative bg-primary flex items-center justify-evenly h-18 mt-6.5 ">
          {navLinks.map(({ url, icon, label }) => {
            const active = basePath === url
            const IconComponent = icon
            return (
              <NavLink
                key={label}
                to={url}
                className={` text-white/60 capitalize flex flex-col items-center
              
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
    </Container>
  )
}
