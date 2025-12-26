import { Outlet } from 'react-router-dom'
import IndexHeader from '../header/IndexHeader'
import IndexFooter from '../footer/IndexFooter'

export default function IndexLayout() {
  return (
    <div>
      <IndexHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>

      <IndexFooter />
    </div>
  )
}
