import { sidebarAboutUs, sidebarDesktopGeneral } from '@/assets/data'
import ProfileImage from '../global/ProfileImage'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SwitchRoleButton from '../buttons/SwitchRoleButton'
import SignOutButton from '../buttons/SignOutButton'

export default function CustomerDesktopMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-auto">
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        sideOffset={10}
        className="translate-x-23 translate-y-9 bg-primary border-2 border-t-transparent border-r-transparent text-white py-6 px-4"
      >
        <DropdownMenuLabel className="px-0 text-lg py-0">
          General
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {sidebarDesktopGeneral.map(({ icon, label, url }) => {
            const IconComponent = icon
            return (
              <DropdownMenuItem key={label} className="px-0">
                <NavLink
                  to={url}
                  className="py-1 flex items-center gap-2 w-full"
                >
                  <IconComponent className="w-5 h-5 text-white" />
                  <span className="capitalize text-xs flex items-center justify-between flex-1">
                    {label}

                    <ChevronRight className="w-4 h-4 font-bold text-white" />
                  </span>
                </NavLink>
              </DropdownMenuItem>
            )
          })}
          <div className="mt-1">
            <SwitchRoleButton className="bg-black" />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuLabel className="px-0 text-lg py-0 mt-4 ">
          About Us
        </DropdownMenuLabel>
        <DropdownMenuGroup className="mb-1">
          {sidebarAboutUs.map(({ icon, label, url }) => {
            const IconComponent = icon
            return (
              <DropdownMenuItem key={label} className="px-0">
                <NavLink
                  to={url}
                  className="py-1 px-0 flex items-center gap-2 w-full"
                >
                  <IconComponent className="w-5 h-5 text-white" />
                  <span className="capitalize text-xs flex items-center justify-between flex-1 ">
                    {label}
                    <ChevronRight className="w-4 h-4 font-bold text-white" />
                  </span>
                </NavLink>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <SignOutButton className="bg-destructive pl-4" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
