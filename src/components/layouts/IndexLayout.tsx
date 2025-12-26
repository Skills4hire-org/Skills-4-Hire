import { Outlet } from 'react-router-dom'
import IndexHeader from '../header/IndexHeader'

export default function IndexLayout() {
  return (
    <div>
      <IndexHeader />
      <Outlet />
    </div>
  )
}
