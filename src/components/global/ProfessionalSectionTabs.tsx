import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'

export default function ProfessionalSectionTabs() {
  const { userType }: { userType: UserType } = useSelector((state: any) => state.userState)
  const sections = userType === 'customer'
    ? [{ to: '/customer/services', label: 'Services' }, { to: '/customer/network', label: 'Network' }]
    : [{ to: '/professional/network', label: 'My Network' }, { to: '/professional/overview', label: 'Overview' }]
  return (
    <nav
      aria-label="Professional sections"
      className="flex border-b border-gray-200"
    >
      {sections.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) =>
        `min-h-12 flex-1 border-b-2 px-4 py-3 text-center text-sm font-semibold transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-900'}`
      }>{label}</NavLink>)}
    </nav>
  )
}
