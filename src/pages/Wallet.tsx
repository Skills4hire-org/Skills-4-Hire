import { walletTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import SearchbarDropmenu from '@/components/global/SearchbarDropmenu'
import SectionHeading from '@/components/services/SectionHeading'
import TabHead from '@/components/global/TabHead'
import DesktopWalletHeader from '@/components/header/DesktopWalletHeader'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import { Tabs } from '@/components/ui/tabs'
import WalletActions from '@/components/wallet/WalletActions'
import WalletBalance from '@/components/wallet/WalletBalance'
import WalletTabContent from '@/components/wallet/WalletTabContent'

export default function Wallet() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Container className="bg-white">
          <MobileWalletHeader />
          <DesktopWalletHeader />
        </Container>
        <Container className="bg-primary py-4 md:py-6">
          <WalletBalance />
        </Container>
        <Container className="py-6 md:py-8 bg-white">
          <WalletActions />
        </Container>
      </div>
      <Container>
        <div className="space-y-3 md:space-y-6">
          <div className="flex items-center justify-between gap-6 ">
            <SectionHeading heading="Transaction History" />
            <SearchbarDropmenu
              position="-translate-x-2"
              placeholder="Search history"
            />
          </div>

          <Tabs
            defaultValue="pending"
            className="w-full max-w-6xl xl:max-w-7xl mx-auto"
          >
            <TabHead tabList={walletTabsList} />
            <WalletTabContent />
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
