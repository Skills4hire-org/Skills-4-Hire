import {
  customerMobileNavLinks,
  serviceProviderMobileNavLinks,
} from '@/assets/data'
import { useLocation } from 'react-router-dom'
import Container from '../global/Container'
import { getBasePath } from '@/utils/format'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import NavLinks from './NavLinks'

export default function Navbar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const pathname = useLocation().pathname
  const basePath = getBasePath(pathname)

  const navLinks =
    userType == 'customer'
      ? customerMobileNavLinks
      : serviceProviderMobileNavLinks
  return (
    <Container>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background md:hidden  ">
        <div className="relative bg-white flex items-center justify-evenly h-13 ">
          {navLinks.map(({ url, icon, label }) => {
            const active = basePath === url
            const props = { url, icon, label, active }
            return <NavLinks key={label} {...props} />
          })}
        </div>
      </nav>
    </Container>
  )
}
