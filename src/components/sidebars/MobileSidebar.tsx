import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import { X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { sidebarAboutUs, sidebarMobileGeneral } from '@/assets/data'
import SignOutButton from '../buttons/SignOutButton'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function MobileSidebar() {
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const is_active = navigator.onLine
  const { toggleSidebar } = useSidebar()
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-1.5 gap-0.5">
        <div className="flex items-start justify-between ">
          <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
          <SidebarTrigger
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <X />
          </SidebarTrigger>
        </div>
        <div>
          <span className="font-bold text-lg block">
            {user?.user?.first_name} {user?.user?.last_name}
          </span>
          <Link
            to="/customer/profile"
            className="capitalize text-primary underline text-xs block"
            onClick={toggleSidebar}
          >
            view profile
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              {sidebarMobileGeneral.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className="py-1 px-0 flex items-center gap-2"
                      onClick={toggleSidebar}
                    >
                      <IconComponent strokeWidth={1.5} className="w-7  h-7 " />
                      <span className="capitalize text-lg flex items-center justify-between flex-1 ">
                        {label}
                      </span>
                    </NavLink>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              {sidebarAboutUs.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    {label == 'helpline number' ? (
                      <a
                        href={url}
                        className="py-1 px-0 flex items-center gap-2"
                      >
                        <IconComponent
                          strokeWidth={1.5}
                          className="w-7 h-7 p-0.5 "
                        />
                        <span className="capitalize text-lg flex items-center justify-between flex-1 ">
                          {label}
                        </span>
                      </a>
                    ) : (
                      <NavLink
                        to={url}
                        className="py-1 px-0 flex items-center gap-2"
                      >
                        <IconComponent
                          strokeWidth={1.5}
                          className="w-7 h-7 p-0.5 "
                        />
                        <span className="capitalize text-lg flex items-center justify-between flex-1 ">
                          {label}
                        </span>
                      </NavLink>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton className=" text-destructive" />
      </SidebarFooter>
    </Sidebar>
  )
}
