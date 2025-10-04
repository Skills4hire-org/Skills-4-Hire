import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../ui/sidebar'
import { NavLink, useLocation } from 'react-router-dom'
import { customerDesktopNavLinks } from '@/assets/data'
import CustomerDesktopMenu from './CustomerDesktopMenu'
import Logo from '../global/Logo'
import { getBasePath } from '@/utils/format'

export default function CustomerDesktopSidebar() {
  const pathname = useLocation().pathname
  const basePath = getBasePath(pathname)
  return (
    <Sidebar className="rounded-r-lg h-full">
      <SidebarHeader className="mt-4 mb-2 px-0 flex-col items-center ">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {customerDesktopNavLinks.map(({ icon, label, url }) => {
                const IconComponent = icon
                const active = url === basePath
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className={`py-2 px-4 flex items-center transition duration-150 gap-2 ${
                        active
                          ? 'text-white border-l-2 border-white'
                          : 'text-white/60'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 " />
                      <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                        {label}
                      </span>
                    </NavLink>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-4 mt-2">
        <CustomerDesktopMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
