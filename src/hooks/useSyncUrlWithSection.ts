import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useSyncUrlWithSection(
  currentSection: string | null,
  navSectionIds: string[],
) {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const lastHash = useRef<string>('')

  useEffect(() => {
    if (pathname !== '/') return

    // Navbar section → update hash
    if (currentSection && navSectionIds.includes(currentSection)) {
      const newHash = `#${currentSection}`

      if (hash !== newHash && lastHash.current !== newHash) {
        lastHash.current = newHash
        navigate(`/${newHash}`, { replace: true })
      }
      return
    }

    // Non-navbar section or none → reset to home
    if (hash) {
      lastHash.current = ''
      navigate('/', { replace: true })
    }
  }, [currentSection, navSectionIds, pathname, hash, navigate])
}
