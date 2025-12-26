import { Menu } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { navLinks } from '@/assets/data'
import { Link, NavLink } from 'react-router-dom'
import { Separator } from '../ui/separator'

export default function SidebarNavSheet() {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = ' font-medium capitalize text-sm py-1.5 px-3 rounded-sm'
    const activeClasses = isActive
      ? 'bg-primary/10 text-primary'
      : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
    return `${baseClasses} ${activeClasses}`
  }

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[250px] px-4">
        <nav className="mt-10 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink to={link.href} end className={getClassName}>
              <SheetClose className="w-full text-left">{link.label}</SheetClose>
            </NavLink>
          ))}

          {/* Divider */}
          <Separator className="mb-4 mt-2" />

          {/* CTA */}
          <SheetClose asChild>
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 
                         text-white font-medium hover:bg-primary/90 transition text-sm"
            >
              Get started
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
