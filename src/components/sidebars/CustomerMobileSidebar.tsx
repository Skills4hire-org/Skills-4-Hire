import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import { Dot, X } from 'lucide-react'
import { TiStar } from 'react-icons/ti'
import { user } from '@/utils/database'
import { Badge } from '../ui/badge'
import { Link, NavLink } from 'react-router-dom'
import { sidebarAboutUs, sidebarMobileGeneral } from '@/assets/data'
import SignOutButton from '../buttons/SignOutButton'
import SwitchRoleButton from '../buttons/SwitchRoleButton'

export default function CustomerMobileSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className=" border-b py-1">
        <div className="flex items-start justify-between ">
          <ProfileImage />
          <SidebarTrigger
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <X />
          </SidebarTrigger>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">
              {user?.firstName} {user?.lastName}
            </span>
            <Badge className="capitalize italic font-normal bg-transparent text-primary text-xs">
              {user?.verified && 'verified'}
            </Badge>
          </div>
          <div className="text-muted-foreground/70 text-sm flex items-center">
            <span className="capitalize">{user?.service}</span>
            <Dot className="text-muted-foreground" />
            <span className="flex items-center gap-1">
              {user?.rating}{' '}
              <TiStar className="w-3 h-3 text-muted-foreground" />
            </span>
            <Dot className="text-muted-foreground" />
            <span>
              {`${user?.totalReviews} review${user?.totalReviews > 1 && 's'}`}{' '}
            </span>
          </div>
          <Link to="" className="capitalize text-primary underline text-sm">
            view profile
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 text-lg text-primary mb-1">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {sidebarMobileGeneral.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className="py-1 px-0 flex items-center gap-2"
                    >
                      <IconComponent strokeWidth={1.5} className="w-6 h-6 " />
                      <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                        {label}
                      </span>
                    </NavLink>
                  </SidebarMenuItem>
                )
              })}
              <div className="mt-1">
                <SwitchRoleButton className="bg-primary text-white" />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 text-lg text-primary mb-1">
            About Us
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {sidebarAboutUs.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className="py-1 px-0 flex items-center gap-2"
                    >
                      <IconComponent
                        strokeWidth={1.5}
                        className="w-6 h-6 p-0.5 "
                      />
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
      <SidebarFooter>
        <SignOutButton className=" text-destructive" />
      </SidebarFooter>
    </Sidebar>
  )
}
