import { navLinks } from '@/assets/data'
import { useIsNavActive } from '@/hooks/useIsNavActive'
import { useCurrentSection } from '@/hooks/useCurrentSection'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { Link, useLocation } from 'react-router-dom'
import { isSameUrl } from '@/utils/format'

export default function IndexNavbar() {
  useScrollToHash()
  const { pathname, hash } = useLocation()
  const sectionIds = [
    'services',
    'faqs',
    'contact',
    'index',
    'about',
    'features',
    'works',
    'value',
  ]
  const navSectionIds = ['services', 'faqs', 'contact']
  const currentSection = useCurrentSection(sectionIds)
  const isActive = useIsNavActive(currentSection, navSectionIds)
  const getClassName = (
    url:
      | {
          label: string
          href: string
          sectionId?: undefined
        }
      | {
          label: string
          href: string
          sectionId: string
        },
  ) => {
    const baseClasses = 'font-medium capitalize text-sm py-2 px-5 transition-all duration-300'
    const activeClasses = isActive(url)
      ? 'text-primary bg-white shadow-sm rounded-full'
      : 'text-slate-500 hover:text-slate-800 hover:bg-black/5 rounded-full'
    return `${baseClasses} ${activeClasses}`
  }
  return (
    <nav className="flex items-center gap-1 bg-[#EEF2F6] rounded-full p-2">
      {navLinks.map((link) => {
        const isActive = isSameUrl(link.href, pathname, hash)
        return (
          <Link
            key={link.label}
            to={link.href}
            onClick={(e) => {
              if (isActive) e.preventDefault()
            }}
            aria-disabled={isActive}
            className={getClassName(link)}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
