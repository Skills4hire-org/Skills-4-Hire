import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ServiceProviderServicesCard from '@/components/service-provider/ServiceProviderServicesCard'
import { serviceAround } from '@/utils/database'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ServiceProviderServices() {
  const { id } = useParams()
  const serviceProvider = serviceAround?.find(
    (provider) => provider.id === Number(id)
  )
  const [visibleCount, setVisibleCount] = useState(10)
  const handleVisibleServices = () => {
    setVisibleCount(visibleCount + 10)
  }
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title={`${serviceProvider?.name}'s Services`} />
      <Container>
        <div className="grid grid-cols gap-4 md:gap-6 xl:grid-cols-7 xl:gap-10 ">
          <div className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-4 ">
              {serviceProvider?.services
                ?.slice(0, visibleCount)
                ?.map((service, index) => (
                  <ServiceProviderServicesCard key={index} {...service} />
                ))}
              {(serviceProvider?.services &&
                serviceProvider?.services?.length <= visibleCount) || (
                <button
                  className="text-xs md:text-sm mx-auto my-2 font-medium hover:text-primary cursor-pointer "
                  onClick={handleVisibleServices}
                >
                  Show more services
                </button>
              )}
            </div>
          </div>
          <div className="xl:col-span-3">
            <div className="space-y-2 md:space-y-4 border p-2 md:p-4 rounded-md shadow-sm ">
              <h2 className="font-semibold text-lg md:text-xl ">
                Similar service providers
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {serviceAround?.slice(0, 4)?.map((serviceProvider, index) => (
                  <ServiceProviderCard key={index} {...serviceProvider} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
