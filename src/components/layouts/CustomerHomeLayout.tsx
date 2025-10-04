import { Outlet } from 'react-router-dom'
import DesktopHomeHeader from '../header/DesktopHomeHeader'
import Container from '../global/Container'
import CustomerHomeNavbar from '../navbars/CustomerHomeNavbar'
import CustomerRightSidebar from '../sidebars/CustomerRightSidebar'
import MobileHomeHeader from '../header/MobileHomeHeader'

export default function CustomerHomeLayout() {
  return (
    <>
      <Container>
        <DesktopHomeHeader />
        <MobileHomeHeader />
      </Container>

      <div className="flex max-w-6xl xl:max-w-7xl mx-auto px-4 lg:px-0">
        <main className="lg:w-[65%] max-w-4xl pb-8 space-y-4">
          <CustomerHomeNavbar />
          <Container>
            <Outlet />
          </Container>
        </main>
        <aside className="hidden lg:block lg:w-[35%] bg-white rounded-l-lg h-max">
          <CustomerRightSidebar />
        </aside>
      </div>
    </>
  )
}
