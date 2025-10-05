import { Outlet } from 'react-router-dom'
import Container from '../global/Container'

export default function ServicesLayout() {
  return (
    <Container className="pt-4 pb-8">
      <Outlet />
    </Container>
  )
}
