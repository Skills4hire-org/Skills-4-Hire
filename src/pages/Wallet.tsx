import { walletTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import SearchbarDropmenu from '@/components/global/SearchbarDropmenu'
import SectionHeading from '@/components/global/SectionHeading'
import TabHead from '@/components/global/TabHead'
import DesktopWalletHeader from '@/components/header/DesktopWalletHeader'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import { Tabs } from '@/components/ui/tabs'
import WalletActions from '@/components/wallet/WalletActions'
import WalletBalance from '@/components/wallet/WalletBalance'

export default function Wallet() {
  return (
    <div className="space-y-4 md:space-y-6">
      <Container className="bg-gradient-primary rounded-b-3xl pb-6">
        <div className="space-y-2 md:space-y-4">
          <MobileWalletHeader />
          <DesktopWalletHeader />
          <div className="space-y-6 md:space-y-8">
            <div>
              <WalletBalance />
            </div>
            <div>
              <WalletActions />
            </div>
          </div>
        </div>
      </Container>
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
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
