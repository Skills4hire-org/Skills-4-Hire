import { supportOptions } from '@/assets/data'
import Container from '@/components/global/Container'
import SupportOptionsCard from '@/components/support/SupportOptionsCard'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'

export default function Support() {
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Support" />
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
