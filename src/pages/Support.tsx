import { supportOptions } from '@/assets/data'
import Container from '@/components/global/Container'
import DesktopSupportHeader from '@/components/header/DesktopSupportHeader'
import MobileSupportHeader from '@/components/header/MobileSupportHeader'
import SupportOptionsCard from '@/components/support/SupportOptionsCard'

export default function Support() {
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileSupportHeader />
        <DesktopSupportHeader />
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          {supportOptions.map((support) => (
            <SupportOptionsCard key={support.text} {...support} />
          ))}
        </div>
      </Container>
    </div>
  )
}
