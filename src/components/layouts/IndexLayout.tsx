import { Outlet } from 'react-router-dom'
import IndexHeader from '../header/IndexHeader'
import IndexFooter from '../footer/IndexFooter'
import Container from '../global/Container'

export default function IndexLayout() {
  return (
    <div>
      <IndexHeader />
      <main className="min-h-screen">
        <Container>
          <Outlet />
        </Container>
      </main>

      <IndexFooter />
    </div>
  )
}
