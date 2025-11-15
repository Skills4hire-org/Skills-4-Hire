import SearchBar from '@/components/global/SearchBar'
import type { AvailableServices } from '@/utils/types'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServicesCard from '@/components/services/ServicesCard'
import { groupedServicesByCategory } from '@/utils/format'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function AvailableServices() {
  const groupedServicesByCategoryArray = Object.entries(
    groupedServicesByCategory
  )
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Available services" />
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
            {groupedServicesByCategoryArray.map(
              ([category, services], index) => {
                return (
                  <div key={index} className="space-y-2 md:space-y-4">
                    <h3 className="text-sm font-semibold capitalize text-center">
                      {category}
                    </h3>
                    <div className="grid grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4">
                      {services.map((service, index) => (
                        <ServicesCard key={index} {...service} />
                      ))}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
