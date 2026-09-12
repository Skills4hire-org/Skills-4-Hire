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
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  customerDesktopNavLinks,
  serviceProviderDesktopNavLinks,
} from '@/assets/data'
import CustomerDesktopMenu from './CustomerDesktopMenu'
import Logo2 from '../global/Logo2'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import ProfileImage from '../global/ProfileImage'
import { Icon } from '@iconify/react'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'
import { useUnreadMessageCount } from '@/hooks/useChats'
import { useUnreadNotificationCount } from '@/hooks/useNotifications'

export default function DesktopSidebar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const is_active = navigator.onLine
  const pathname = useLocation().pathname
  const { count: unreadMessageCount } = useUnreadMessageCount()
  const { count: unreadNotificationCount } = useUnreadNotificationCount()

  const desktopNavLinks =
    userType == 'customer'
      ? customerDesktopNavLinks
      : serviceProviderDesktopNavLinks

  return (
    <Sidebar className="rounded-r-lg w-65 h-full border-none bg-white">
      <SidebarHeader className="mt-4 mb-2 px-0 flex-col items-center">
        <Logo2 />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {desktopNavLinks.map(({ icon, activeIcon, label, url }: { icon: string; activeIcon?: string; label: string; url: string; key?: string }) => {
                const active = pathname.startsWith(url)
                return (
                  <SidebarMenuItem key={label} className="group">
                    <NavLink
                      to={url}
                      className={`py-2 px-4 flex items-center transition duration-150 gap-2  ${
                        active
                          ? 'text-black border-l-2 border-primary'
                          : 'text-black/60 hover:bg-background hover:text-foreground'
                      }`}
                    >
                      <Icon
                        icon={active && activeIcon ? activeIcon : icon}
                        className={`w-5 h-5 ${active ? 'text-primary' : ''}`}
                      />
                      <span className="capitalize text-[1rem] flex items-center justify-between flex-1 ">
                        {label}
                        {label === 'messages' && unreadMessageCount > 0 && (
                          <span className="bg-red-600 text-white text-[10px] leading-3.5 min-w-4 h-4 px-1 rounded-full inline-flex items-center justify-center font-semibold">
                            {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                          </span>
                        )}
                        {label === 'notification' && unreadNotificationCount > 0 && (
                          <span className="bg-red-600 text-white text-[10px] leading-3.5 min-w-4 h-4 px-1 rounded-full inline-flex items-center justify-center font-semibold">
                            {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                          </span>
                        )}
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
        {userType === 'customer' ? (
          <CustomerDesktopMenu />
        ) : (
          <Link to="/professional/profile" className="mx-auto">
            <ProfileImage is_active={is_active} avatar={avatar} />
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
