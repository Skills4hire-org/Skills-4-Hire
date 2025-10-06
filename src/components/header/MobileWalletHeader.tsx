import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'

export default function MobileWalletHeader() {
  return (
    <header className="flex md:hidden justify-end py-2 mb-4">
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
    </header>
  )
}
