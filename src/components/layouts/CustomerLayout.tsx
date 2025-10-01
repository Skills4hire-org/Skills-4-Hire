import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import CustomerHeader from '../header/CustomerHeader'
import Container from '../global/Container'
import CustomerSidebar from '../sidebars/CustomerSidebar'
import UserNavbar from '../navbars/UserNavbar'

export default function CustomerLayout() {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <CustomerSidebar />
        <Container>
          <CustomerHeader />
          <div className="relative mb-22 z-50">
            <Outlet />
          </div>

          <UserNavbar />
        </Container>
      </SidebarProvider>
    </div>
  )
}
