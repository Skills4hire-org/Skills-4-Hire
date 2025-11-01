import Container from '@/components/global/Container'
import ServiceProviderActivity from '@/components/service-provider/ServiceProviderActivity'
import ServiceProviderOverview from '@/components/service-provider/ServiceProviderOverview'
import ServiceProviderServices from '@/components/service-provider/ServiceProviderServices'
import ServiceProviderTab from '@/components/service-provider/ServiceProviderTab'
import { Button } from '@/components/ui/button'
import { getServiceProvider } from '@/utils/loaders'
import { Link, useParams } from 'react-router-dom'

export default function ServiceProviderProfile() {
  const { id } = useParams()
  const serviceProvider = getServiceProvider(id)
  return (
    <>
      <ServiceProviderOverview getServiceProvider={serviceProvider} />
      <div className="pb-10">
        <Container className="border-b-8 py-2 md:py-4">
          <ServiceProviderTab getServiceProvider={serviceProvider} />
        </Container>
        <Container className="border-b-8 py-2 md:py-4 relative">
          <ServiceProviderActivity getServiceProvider={serviceProvider} />
        </Container>
        <Container className=" pt-2 pb-4 md:py-4">
          <ServiceProviderServices getServiceProvider={serviceProvider} />
        </Container>
      </div>

      <div className="flex items-center justify-center gap-8 md:gap-10 fixed left-1/2 -translate-x-1/2 bottom-16 md:bottom-4 md:ml-[6rem] z-50">
        <Link to="/customer/chats">
          <Button className="bg-green-700 rounded-sm hover:bg-green-700/80 w-30">
            Message Me
          </Button>
        </Link>
        <Link to={`/customer/service-provider/${serviceProvider?.id}/booking`}>
          <Button className="w-30">Book Me</Button>
        </Link>
      </div>
    </>
  )
}
