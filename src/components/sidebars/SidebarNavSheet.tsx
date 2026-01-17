import { Menu } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { navLinks } from '@/assets/data'
import { Link, useLocation } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { useState } from 'react'

export default function SidebarNavSheet() {
  const [open, setOpen] = useState(false)
  const pathname = useLocation().pathname
  const hash = useLocation().hash
  const getClassName = (url: string) => {
    const baseClasses = ' font-medium capitalize text-sm py-1.5 px-3 rounded-sm'
    const activeClasses =
      url == `${pathname}${hash}`
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
    return `${baseClasses} ${activeClasses}`
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden cursor-pointer">
        <Menu className="h-6 w-6 text-foreground" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[250px] px-4">
        <nav className="mt-10 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={getClassName(link.href)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <Separator className="mb-4 mt-2" />

          {/* CTA */}
          <SheetClose asChild>
            <Link
              to="/sign-up"
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
