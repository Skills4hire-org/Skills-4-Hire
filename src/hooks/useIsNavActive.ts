import { useLocation } from 'react-router-dom'
import type { NavLink } from '@/assets/data'

export function useIsNavActive(
  currentSection: string | null,
  navSectionIds: string[],
) {
  const { pathname } = useLocation()

  return (link: NavLink) => {
    const sectionId = 'sectionId' in link ? link.sectionId : undefined

    // Non-home page links: active when the href exactly matches the current pathname
    if (link.href === pathname && !sectionId && link.href !== '/') return true

    // On the home page
    if (pathname === '/') {
      // Hash-section link: active only when that section is currently visible and is a navbar section
      if (
        sectionId &&
        currentSection &&
        navSectionIds.includes(currentSection) &&
        sectionId === currentSection
      ) {
        return true
      }

      // Home link: active when no navbar section is in view
      if (link.href === '/' && (!currentSection || !navSectionIds.includes(currentSection))) {
        return true
      }
    }

    return false
  }
}
