import { useSidebar } from '../ui/sidebar'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

export default function Sidebars() {
  const { isMobile } = useSidebar()
  return <div>{isMobile ? <MobileSidebar /> : <DesktopSidebar />}</div>
}
