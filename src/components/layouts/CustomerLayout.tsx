import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import UserNavbar from '../navbars/UserNavbar'
import CustomerSidebars from '../sidebars/CustomerSidebars'

export default function CustomerLayout() {
  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <CustomerSidebars />
        <div className="flex-1 overflow-hidden">
          <div className="mb-20 md:mb-6">
            <Outlet />
          </div>
          <UserNavbar />
        </div>
      </SidebarProvider>
    </div>
  )
}
