import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { Input } from '@/components/ui/input'
import { serviceAround } from '@/utils/database'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServicesAroundYou() {
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Services around you" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <div>
            <Link to="/customer/services/search">
              <div className={`relative w-full mx-auto`}>
                <Input
                  type="text"
                  className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
                  placeholder="Search for services"
                  name="searchQuery"
                  id="searchQuery"
                />
                <button
                  type="submit"
                  className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
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
