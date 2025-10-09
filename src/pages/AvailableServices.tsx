import SearchBar from '@/components/global/SearchBar'
import type { AvailableServices } from '@/utils/types'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServicesCard from '@/components/services/ServicesCard'
import { groupedServicesByCategory } from '@/utils/format'

export default function AvailableServices() {
  const groupedServicesByCategoryArray = Object.entries(
    groupedServicesByCategory
  )
  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white py-1 md:py-4">
        <header className="relative">
          <Link
            to="/customer/services"
            className="left-0 absolute top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-bold text-center text-lg md:text-xl">
            Available services
          </h1>
        </header>
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

          <div className="space-y-4 md:space-y-6">
            {groupedServicesByCategoryArray.map(([category, services]) => {
              return (
                <div key={category} className="space-y-2 md:space-y-4">
                  <h3 className="text-sm font-semibold capitalize text-center">
                    {category}
                  </h3>

                  <div className="grid grid-cols-3 xl:grid-cols-5 gap-4">
                    {services.map((service) => (
                      <ServicesCard key={service.serviceName} {...service} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}
