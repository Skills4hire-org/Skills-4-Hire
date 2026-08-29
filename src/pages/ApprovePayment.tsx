import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import Container from '@/components/global/Container'
import { useLocation, useParams } from 'react-router-dom'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import PendingPaymentForm from '@/components/form/PendingPaymentForm'
import type { Booking } from '@/types/bookings.type'

export default function ApprovePayment() {
  const { id } = useParams()
  const location = useLocation()
  const data: Booking = location.state

  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <div className="md:hidden">
          <HeaderWithBackNavigation title="Approve Payment" />
        </div>
        <TitleOnlyDesktopHeader title="Approve Payment" />
      </Container>
      <Container>
        <div className="w-full max-w-4xl mx-auto md:mx-0 space-y-4 md:space-y-6">
          <div className="space-y-1 pb-2 md:pb-4 border-b border-gray-300">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Pending
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed md:w-full">
              Payment for the service will remain locked until the skilled
              professional has successfully completed the agreed-upon task.
            </p>
          </div>
          <PendingPaymentForm
            from={data?.customer?.profile?.display_name}
            to={data?.provider?.user?.profile?.display_name}
            amount={data?.price}
            provider_id={data?.provider?.provider_id}
            booking_id={id}
          />
        </div>
      </Container>
    </div>
  )
}
