import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '@/assets/data'
import { useCurrentSection } from '@/hooks/useCurrentSection'
import { useIsNavActive } from '@/hooks/useIsNavActive'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { isSameUrl } from '@/utils/format'
import { motion, AnimatePresence } from 'framer-motion'

const sectionIds = ['services', 'faqs', 'contact', 'index', 'about', 'features', 'works', 'value']
const navSectionIds = ['services', 'faqs', 'contact']

/**
 * Mobile dropdown navigation menu.
 * Replaces the slide-in Sheet on small screens with an animated dropdown panel.
 */
export default function MobileDropdownNav() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useScrollToHash()
  const { pathname, hash } = useLocation()
  const currentSection = useCurrentSection(sectionIds)
  const isActive = useIsNavActive(currentSection, navSectionIds)

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close when the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  const getLinkClassName = (link: (typeof navLinks)[number]) => {
    const base = 'flex items-center font-medium text-sm py-2.5 px-3 rounded-[8px] transition-colors duration-200'
    const active = isActive(link)
      ? 'bg-primary/10 text-primary'
      : 'text-slate-700 hover:bg-slate-100 hover:text-foreground'
    return `${base} ${active}`
  }

  return (
    <div ref={menuRef} className="relative md:hidden">
      {/* Hamburger / Close Toggle */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-dropdown"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9 rounded-[8px] text-foreground hover:bg-slate-100 transition-colors duration-200"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-dropdown"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] w-56 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50"
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 p-2">
              {navLinks.map((link) => {
                const active = isSameUrl(link.href, pathname, hash)
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => {
                      if (active) {
                        e.preventDefault()
                        // Smooth-scroll to top using Lenis if available, else native
                        window.lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                      setOpen(false)
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={getLinkClassName(link)}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
