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
import { useNavigate } from 'react-router-dom'
import SwitchRoleButton from '../buttons/SwitchRoleButton'
import SignOutButton from '../buttons/SignOutButton'

export default function CustomerDesktopMenu() {
  const navigate = useNavigate()
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
              <DropdownMenuItem
                onClick={(event) => {
                  event.preventDefault()
                  navigate(url)
                }}
                key={label}
                className="px-1 group cursor-pointer"
                asChild
              >
                <div className="py-2 flex items-center gap-2 w-full">
                  <IconComponent className="w-5 h-5  group-hover:text-foreground" />
                  <span className="capitalize text-sm flex items-center justify-between group-hover:text-foreground flex-1">
                    {label}
                  </span>
                </div>
              </DropdownMenuItem>
            )
          })}
          <div className="mt-2">
            <SwitchRoleButton className="bg-black" />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuLabel className="px-0 text-lg py-0 mt-4 ">
          About Us
        </DropdownMenuLabel>
        <DropdownMenuGroup className="mb-2">
          {sidebarAboutUs.map(({ icon, label, url }) => {
            const IconComponent = icon
            return (
              <DropdownMenuItem
                key={label}
                className="px-1 group cursor-pointer"
                asChild
                onClick={(event) => {
                  event.preventDefault()
                  navigate(url)
                }}
              >
                <div className="py-2 flex items-center gap-2 w-full">
                  <IconComponent className="w-5 h-5  group-hover:text-foreground" />
                  <span className="capitalize text-sm flex items-center justify-between flex-1 ">
                    {label}
                  </span>
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <SignOutButton className="bg-destructive pl-4" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
