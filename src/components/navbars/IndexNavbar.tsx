import { navLinks } from '@/assets/data'
import type { NavLink } from '@/assets/data'
import { useIsNavActive } from '@/hooks/useIsNavActive'
import { useCurrentSection } from '@/hooks/useCurrentSection'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { Link, useLocation } from 'react-router-dom'
import { isSameUrl } from '@/utils/format'

const sectionIds = ['services', 'faqs', 'contact', 'index', 'about', 'features', 'works', 'value']
const navSectionIds = ['services', 'faqs', 'contact']

export default function IndexNavbar() {
  useScrollToHash()
  const { pathname, hash } = useLocation()
  const currentSection = useCurrentSection(sectionIds)
  const isActive = useIsNavActive(currentSection, navSectionIds)

  const getClassName = (link: NavLink) => {
    const base = 'font-medium capitalize text-sm py-2 px-5 transition-all duration-300'
    const active = isActive(link)
      ? 'text-primary bg-white shadow-sm rounded-full'
      : 'text-slate-500 hover:text-slate-800 hover:bg-black/5 rounded-full'
    return `${base} ${active}`
  }

  return (
    <nav className="flex items-center gap-1 bg-[#EEF2F6] rounded-full p-2" aria-label="Main navigation">
      {navLinks.map((link) => {
        const active = isSameUrl(link.href, pathname, hash)
        return (
          <Link
            key={link.label}
            to={link.href}
            onClick={(e) => {
              if (active) e.preventDefault()
            }}
            aria-current={active ? 'page' : undefined}
            className={getClassName(link)}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
