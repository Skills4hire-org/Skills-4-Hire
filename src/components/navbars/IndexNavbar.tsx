import { navLinks } from '@/assets/data'
import { Link, useLocation } from 'react-router-dom'

export default function IndexNavbar() {
  const pathname = useLocation().pathname
  const hash = useLocation().hash
  const getClassName = (url: string) => {
    const baseClasses = ' font-medium capitalize text-sm py-1.5 px-3 rounded-sm'
    const activeClasses =
      url == `${pathname}${hash}`
        ? ' text-primary'
        : 'text-muted-foreground hover:text-foreground'
    return `${baseClasses} ${activeClasses}`
  }
  return (
    <nav className="flex items-center bg-gray-100 rounded-full ">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={getClassName(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
