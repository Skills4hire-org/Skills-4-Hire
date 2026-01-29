import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return

    const id = hash.replace('#', '')
    const el = document.getElementById(id)

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }
  }, [hash, pathname])
}
