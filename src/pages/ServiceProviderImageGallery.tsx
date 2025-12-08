import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderGallery from '@/components/service-provider/ServiceProviderGallery'
import { serviceAround } from '@/utils/database'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ServiceProviderImageGallery() {
  const { id } = useParams()
  const serviceProvider = serviceAround?.find(
    (provider) => provider.id === Number(id)
  )
  const [visibleCount, setVisibleCount] = useState(10)
  const handleVisibleImages = () => {
    setVisibleCount(visibleCount + 10)
  }
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title={`${serviceProvider?.name}'s Gallery`} />
      <Container>
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {serviceProvider?.gallery
              ?.slice(0, visibleCount)
              ?.map((image, index) => (
                <ServiceProviderGallery key={index} image={image} />
              ))}
          </div>
          {(serviceProvider?.services &&
            serviceProvider?.services?.length <= visibleCount) || (
            <button
              className="text-xs md:text-sm mx-auto my-4 font-medium hover:text-primary cursor-pointer block"
              onClick={handleVisibleImages}
            >
              Show more images
            </button>
          )}
        </>
      </Container>
    </div>
  )
}
