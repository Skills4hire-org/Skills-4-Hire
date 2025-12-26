import { navLinks } from '@/assets/data'
import { NavLink } from 'react-router-dom'

export default function IndexNavbar() {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = ' font-medium capitalize text-sm py-1.5 px-3 rounded-sm'
    const activeClasses = isActive
      ? ' text-primary'
      : 'text-muted-foreground hover:text-foreground'
    return `${baseClasses} ${activeClasses}`
  }
  return (
    <nav className="flex items-center bg-gray-100 rounded-full ">
      {navLinks.map((link) => (
        <NavLink to={link.href} end className={getClassName}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
