import { Outlet } from 'react-router-dom'
import DesktopHomeHeader from '../header/DesktopHomeHeader'
import Container from '../global/Container'
import HomeNavbar from '../navbars/HomeNavbar'
import MobileHomeHeader from '../header/MobileHomeHeader'
import CustomerDesktopRightSidebar from '../sidebars/CustomerDesktopRightSidebar'

export default function HomeLayout() {
  return (
    <>
      <Container className="bg-white border-b shadow-sm max-[1023px]:min-[768px]:w-135 max-[1023px]:min-[768px]:ml-17">
        <DesktopHomeHeader />
        <MobileHomeHeader />
      </Container>
      <div className="flex max-w-6xl max-[1023px]:min-[768px]:w-135 max-[1023px]:min-[768px]:ml-17 xl:max-w-7xl mx-auto px-2 sm:px-4 lg:px-0 lg:mt-0 md:mt-3">
        <main className="lg:w-[70%] lg:ml-20 w-full space-y-2.5 md:space-y-4 lg:mt-2">
          <HomeNavbar />
          <Outlet />
        </main>
        <aside className="hidden lg:block lg:w-[30%] bg-white rounded-l-lg h-max mt-0">
          <CustomerDesktopRightSidebar />
        </aside>
      </div>
    </>
  )
}
