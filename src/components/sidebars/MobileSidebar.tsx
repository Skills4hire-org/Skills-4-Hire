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
import { FileText, HelpCircle, Info, PhoneCall, ShieldAlert, X } from 'lucide-react'
import { user } from '@/utils/database'
import { Link, NavLink } from 'react-router-dom'
import { sidebarMobileGeneral } from '@/assets/data'
import SignOutButton from '../buttons/SignOutButton'
import SwitchRoleButton from '../buttons/SwitchRoleButton'

export default function MobileSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-1.5 gap-0.5">
        <div className="flex items-start justify-between ">
          <ProfileImage size="size-10" />
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
            {user?.firstName} {user?.lastName}
          </span>
          <Link
            to="/customer/profile"
            className="capitalize text-primary underline text-xs block"
          >
            view profile
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-0 text-base text-primary">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              {sidebarMobileGeneral.map(({ icon, label, url }) => {
                const IconComponent = icon
                return (
                  <SidebarMenuItem key={label}>
                    <NavLink
                      to={url}
                      className="py-1 px-0 flex items-center gap-2"
                    >
                      <IconComponent strokeWidth={1.5} className="w-5 h-5 " />
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
          <SidebarGroupLabel className="px-0 text-base text-primary">
            About Us
          </SidebarGroupLabel>
          <SidebarGroupContent className="-mt-1">
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <NavLink to="/about" className="py-1 px-0 flex items-center gap-2">
                  <Info strokeWidth={1.5} className="w-5 h-5 p-0.5" />
                  <span className="capitalize text-xs">about us</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/privacy-policy" className="py-1 px-0 flex items-center gap-2">
                  <ShieldAlert strokeWidth={1.5} className="w-5 h-5 p-0.5" />
                  <span className="capitalize text-xs">privacy policy</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/terms-and-conditions" className="py-1 px-0 flex items-center gap-2">
                  <FileText strokeWidth={1.5} className="w-5 h-5 p-0.5" />
                  <span className="capitalize text-xs">terms & conditions</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/customer/support" className="py-1 px-0 flex items-center gap-2">
                  <HelpCircle strokeWidth={1.5} className="w-5 h-5 p-0.5" />
                  <span className="capitalize text-xs">help & support</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/" className="py-1 px-0 flex items-center gap-2">
                  <PhoneCall strokeWidth={1.5} className="w-5 h-5 p-0.5" />
                  <span className="capitalize text-xs">helpline number</span>
                </NavLink>
              </SidebarMenuItem>
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
