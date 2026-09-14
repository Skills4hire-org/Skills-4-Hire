import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from 'lenis'
import IndexHeader from '../header/IndexHeader'
import IndexFooter from '../footer/IndexFooter'
import ScrollToTop from '../global/ScrollToTop'

export default function IndexLayout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // @ts-ignore lenis's global Window typing conflicts with assigning an instance
    window.lenis = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      // @ts-ignore lenis's global Window typing does not allow undefined
      window.lenis = undefined
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <div>
        <IndexHeader />
        <main className="min-h-screen">
          <Outlet />
        </main>

        <IndexFooter />
      </div>
    </>
  )
}
