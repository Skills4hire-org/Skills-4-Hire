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
import ProfileImage from '../global/ProfileImage'
import { NavLink, useLocation } from 'react-router-dom'
import { customerDesktopNavLinks } from '@/assets/data'
import logo from '@/assets/images/logo.png'

export default function CustomerDesktopSidebar() {
  const pathname = useLocation().pathname
  return (
    <Sidebar className="rounded-r-lg">
      <SidebarHeader className="mt-4 mb-2 px-4 ">
        <figure className="mx-auto">
          <img src={logo} alt="logo" className="w-20" width={108} height={62} />
        </figure>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {customerDesktopNavLinks.map(({ icon, label, url }) => {
                const IconComponent = icon
                const active = url === pathname
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
        <div className="w-max mx-auto">
          <ProfileImage size="lg" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
