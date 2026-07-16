import { Link } from 'react-router-dom'
import Container from '../global/Container'
import Logo2 from '../global/Logo2'
import { ArrowRight } from 'lucide-react'
import IndexNavbar from '../navbars/IndexNavbar'
import MobileDropdownNav from '../navbars/MobileDropdownNav'

export default function IndexHeader() {
  return (
    <header className="sticky w-full top-0 z-50 shadow-sm">
      <Container className="py-4 md:py-6 bg-white">
        <div className="relative flex items-center justify-between text-muted-foreground">
          {/* Logo — left */}
          <Logo2 size="h-7" />

          {/* Nav links — absolutely centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <IndexNavbar />
          </div>

          {/* Right side — Buttons + mobile menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-[4px] bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="group hidden md:inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium rounded-[4px] bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <MobileDropdownNav />
          </div>
        </div>
      </Container>
    </header>
  )
}


