import ConversationList from '@/components/chats/ConversationList'
import Container from '@/components/global/Container'
import DesktopWalletHeader from '@/components/header/DesktopWalletHeader'
import MobileWalletHeader from '@/components/header/MobileWalletHeader'
import { useIsMobile } from '@/hooks/use-mobile'
import { Outlet, useParams } from 'react-router-dom'

export default function Chat() {
  const isMobile = useIsMobile()
  const { conversationId } = useParams()

  return (
    <div className="space-y-4 md:space-y-6">
      <Container className="bg-white">
        {!conversationId && <MobileWalletHeader title="Chats" />}

        <DesktopWalletHeader title="Chats" />
      </Container>
      <Container>
        {isMobile ? (
          <div className={`${conversationId && 'h-[88vh] -mb-8'}`}>
            <Outlet />
          </div>
        ) : (
          <div className="flex h-[84vh] -mb-6">
            <div className="w-1/2 lg:w-2/5 border-r pr-4">
              <ConversationList />
            </div>
            <div className="flex-1 pl-4">
              {conversationId ? (
                <Outlet />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a conversation
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
