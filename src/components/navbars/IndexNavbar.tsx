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
    const baseClasses = ' font-medium capitalize text-sm py-1.5 px-3 rounded-sm'
    const activeClasses = isActive(url)
      ? ' text-primary'
      : 'text-muted-foreground hover:text-foreground'
    return `${baseClasses} ${activeClasses}`
  }
  return (
    <nav className="flex items-center bg-gray-100 rounded-full ">
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
