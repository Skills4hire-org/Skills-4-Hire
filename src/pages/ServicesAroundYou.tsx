import Container from '@/components/global/Container'
import SearchBar from '@/components/global/SearchBar'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { serviceAround } from '@/utils/database'
import { Link } from 'react-router-dom'

export default function ServicesAroundYou() {
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Services around you" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <div>
            <Link to="/customer/services/search">
              <SearchBar
                placeholder="Search for services"
                maxWidth="w-full md:max-w-xl"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {serviceAround.map((service) => (
              <ServiceProviderCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
