import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import CustomerMobileHeader from '../header/CustomerMobileHeader'
import UserNavbar from '../navbars/UserNavbar'
import CustomerSidebars from '../sidebars/CustomerSidebars'

export default function CustomerLayout() {
  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <CustomerSidebars />
        <div className="w-full">
          <CustomerMobileHeader />
          <div className="mb-22">
            <Outlet />
          </div>
          <UserNavbar />
        </div>
      </SidebarProvider>
    </div>
  )
}
