import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import Navbar from '../navbars/Navbar'
import Sidebars from '../sidebars/Sidebars'

export default function Layout() {
  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <Sidebars />
        <div className="flex-1 overflow-hidden">
          <div className="mb-20 md:mb-6">
            <Outlet />
          </div>
          <Navbar />
        </div>
      </SidebarProvider>
    </div>
  )
}
