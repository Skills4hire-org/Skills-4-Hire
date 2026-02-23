import { walletTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import TabHead from '@/components/global/TabHead'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Tabs } from '@/components/ui/tabs'
import WalletTabContent from '@/components/wallet/WalletTabContent'

export default function TransactionHistory() {
  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Transaction History" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <Tabs
          defaultValue="pending"
          className="w-full max-w-6xl xl:max-w-7xl mx-auto"
        >
          <TabHead tabList={walletTabsList} />
          <WalletTabContent />
        </Tabs>
      </Container>
    </div>
  )
}
