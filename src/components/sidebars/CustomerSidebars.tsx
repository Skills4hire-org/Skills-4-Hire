import { useSidebar } from '../ui/sidebar'
import CustomerDesktopSidebar from './CustomerDesktopSidebar'
import CustomerMobileSidebar from './CustomerMobileSidebar'

export default function CustomerSidebars() {
  const { isMobile } = useSidebar()
  return (
    <>{isMobile ? <CustomerMobileSidebar /> : <CustomerDesktopSidebar />}</>
  )
}
