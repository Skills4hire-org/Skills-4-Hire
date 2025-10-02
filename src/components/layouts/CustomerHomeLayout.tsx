import { Outlet } from 'react-router-dom'
import DesktopHomeHeader from '../header/DesktopHomeHeader'
import Container from '../global/Container'
import CustomerHomeNavbar from '../navbars/CustomerHomeNavbar'

export default function CustomerHomeLayout() {
  return (
    <>
      <Container className="bg-white">
        <DesktopHomeHeader />
      </Container>
      <CustomerHomeNavbar />
      <Container>
        <main className="lg:w-[65%] max-w-4xl py-8 px-4">
          <Outlet />
        </main>
        <aside></aside>
      </Container>
    </>
  )
}
