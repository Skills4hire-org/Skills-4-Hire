import { walletTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import SectionHeading from '@/components/global/SectionHeading'
import TabHead from '@/components/global/TabHead'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import { Tabs } from '@/components/ui/tabs'
import WalletActions from '@/components/wallet/WalletActions'
import WalletBalance from '@/components/wallet/WalletBalance'
import { MoreVertical, SearchIcon } from 'lucide-react'

export default function Wallet() {
  return (
    <div className="pb-8 space-y-6">
      <Container className="bg-gradient-primary rounded-b-3xl py-4 space-y-8 ">
        <MobileWalletHeader />
        <WalletBalance />
        <WalletActions />
      </Container>
      <Container>
        <div className="flex items-center justify-between gap-6 mb-6">
          <SectionHeading heading="Transaction History" />
          <div className="flex items-center gap-2">
            <SearchIcon className="w-4 h-4" />
            <MoreVertical className="w-4 h-4" />
          </div>
        </div>

        <Tabs
          defaultValue="pending"
          className="w-full max-w-6xl xl:max-w-7xl mx-auto"
        >
          <TabHead tabList={walletTabsList} />
        </Tabs>
      </Container>
    </div>
  )
}
