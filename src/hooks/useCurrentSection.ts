import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useCurrentSection(allSectionIds: string[]) {
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/') {
      setCurrentSection(null)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setCurrentSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-5% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    )

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname, allSectionIds])

  return currentSection
}
