import {
  customerWalletTabsList,
  serviceProviderWalletTabsList,
} from '@/assets/data'
import Container from '@/components/global/Container'
import TabHead from '@/components/global/TabHead'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Tabs } from '@/components/ui/tabs'
import WalletTabContent from '@/components/wallet/WalletTabContent'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'

export default function TransactionHistory() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const tabsList =
    userType == 'customer'
      ? customerWalletTabsList
      : serviceProviderWalletTabsList

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Transaction History" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <Tabs
          defaultValue="pending"
          className="w-full max-w-6xl xl:max-w-7xl mx-auto"
        >
          <TabHead tabList={tabsList} />
          <WalletTabContent />
        </Tabs>
      </Container>
    </div>
  )
}
