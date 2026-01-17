import { Outlet } from 'react-router-dom'
import IndexHeader from '../header/IndexHeader'
import IndexFooter from '../footer/IndexFooter'
import ScrollToTop from '../global/ScrollToTop'

export default function IndexLayout() {
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
