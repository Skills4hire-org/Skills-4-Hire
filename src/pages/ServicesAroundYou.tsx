import Container from '@/components/global/Container'
import SearchBar from '@/components/global/SearchBar'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { serviceAround } from '@/utils/database'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServicesAroundYou() {
  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white py-1 md:py-4">
        <div className="relative">
          <Link
            to="/customer/services"
            className="left-0 absolute top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-bold  text-center text-lg md:text-xl">
            Services around you
          </h1>
        </div>
      </Container>
      <Container>
        <div className="space-y-4 md:space-y-6">
          <div>
            <Link to="/customer/services/search">
              <SearchBar
                placeholder="Search service"
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
