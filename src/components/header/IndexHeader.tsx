import { Link } from 'react-router-dom'
import Container from '../global/Container'
import Logo2 from '../global/Logo2'
import IndexNavbar from '../navbars/IndexNavbar'
import SidebarNavSheet from './SidebarNavSheet'

export default function IndexHeader() {
  return (
    <header className="sticky w-full top-0 relative z-50">
      <Container className="py-3 md:py-4 bg-white">
        <div className="flex items-center justify-between md:justify-between text-muted-foreground">
          <Logo2 size="h-5.5 md:h-6.5" />
          <div className="hidden md:inline-block">
            <IndexNavbar />
          </div>
          <Link
            to="/sign-up"
            className="text-sm font-medium rounded-md bg-primary capitalize text-white px-4 py-1.5 px-8 hover:bg-primary/90 hidden md:inline-block"
          >
            Get started
          </Link>
          <SidebarNavSheet />
        </div>
      </Container>
    </header>
  )
}
