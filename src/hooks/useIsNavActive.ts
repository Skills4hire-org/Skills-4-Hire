import { useLocation } from 'react-router-dom'

export function useIsNavActive(
  currentSection: string | null,
  navSectionIds: string[],
) {
  const { pathname } = useLocation()

  return (link: any) => {
    // Other pages
    if (link.href === pathname && !link.sectionId) return true

    // On home page
    if (pathname === '/') {
      // Navbar section active ONLY if current section is in navbar
      if (
        link.sectionId &&
        currentSection &&
        navSectionIds.includes(currentSection) &&
        link.sectionId === currentSection
      ) {
        return true
      }

      // Home active if:
      // - no section
      // - OR section not in navbar
      if (
        link.href === '/' &&
        (!currentSection || !navSectionIds.includes(currentSection))
      ) {
        return true
      }
    }

    return false
  }
}
