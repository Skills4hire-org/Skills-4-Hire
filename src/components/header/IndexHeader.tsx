import Container from '../global/Container'
import Logo from '../global/Logo2'
import DropdownMenu from './DropdownMenu'

export default function IndexHeader() {
  return (
    <header>
      <Container className="py-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <Logo />
          <DropdownMenu />
        </div>
      </Container>
    </header>
  )
}
