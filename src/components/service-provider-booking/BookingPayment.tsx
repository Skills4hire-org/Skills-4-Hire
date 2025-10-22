import type { ServiceProvider } from '@/utils/types'
import Container from '../global/Container'
import ProfileImage from '../global/ProfileImage'
import SectionHeading from './SectionHeading'
import { Badge } from '../ui/badge'
import PaymentForm from '../form/PaymentForm'

export default function BookingPayment({
  serviceProvider,
}: {
  serviceProvider: ServiceProvider | undefined
}) {
  return (
    <>
      <SectionHeading title="Payment" />
      <Container className="">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <ProfileImage noStatus />
            <div className="flex flex-col items-center justify-center gap-0.5">
              <h3 className="text-sm">{serviceProvider?.name}</h3>
              <Badge className="capitalize bg-gray-300 text-foreground px-2 pb-1 ">
                {serviceProvider?.occupation}
              </Badge>
            </div>
          </div>
          <PaymentForm serviceProvider={serviceProvider} />
        </div>
      </Container>
    </>
  )
}
