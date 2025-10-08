import { Outlet } from 'react-router-dom'
import DesktopHomeHeader from '../header/DesktopHomeHeader'
import Container from '../global/Container'
import CustomerHomeNavbar from '../navbars/CustomerHomeNavbar'
import MobileHomeHeader from '../header/MobileHomeHeader'
import CustomerDesktopRightSidebar from '../sidebars/CustomerDesktopRightSidebar'

export default function CustomerHomeLayout() {
  return (
    <>
      <Container className="bg-white">
        <DesktopHomeHeader />
        <MobileHomeHeader />
      </Container>

      <div className="flex max-w-6xl xl:max-w-7xl mx-auto px-2 lg:px-0 mt-2 md:mt-3">
        <main className="lg:w-[75%] w-full space-y-2.5 md:space-y-4">
          <CustomerHomeNavbar />
          <Outlet />
        </main>
        <aside className="hidden lg:block lg:w-[25%] bg-white rounded-l-lg h-max">
          <CustomerDesktopRightSidebar />
        </aside>
      </div>
    </>
  )
}
