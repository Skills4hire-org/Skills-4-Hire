import Container from '@/components/global/Container'
import SearchBar from '@/components/global/SearchBar'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceAroundYouCard from '@/components/services/ServiceAroundYouCard'
import { serviceAround } from '@/utils/database'

export default function ServicesSearch() {
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="What are you looking for?" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <SearchBar
            placeholder="Search for services"
            maxWidth="w-full md:max-w-xl"
            autoFocus
          />
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-base font-semibold ">Recommended for you</h2>
            <div className="grid grid-cols-1 gap-4">
              {serviceAround.map((service) => (
                <ServiceAroundYouCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
