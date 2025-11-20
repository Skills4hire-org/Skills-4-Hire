import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import Container from '@/components/global/Container'
import { requests } from '@/assets/data'
import RequestCard from '@/components/overview/RequestCard'

export default function Request() {
  return (
    <div>
      <HeaderWithBackNavigation title="Request" onlyMobile={false} />
      <Container>
        <div className="w-full flex flex-col gap-2 md:gap-4 max-w-xl mx-auto">
          {requests.map((request) => (
            <RequestCard key={request.id} {...request} />
          ))}
        </div>
      </Container>
    </div>
  )
}
