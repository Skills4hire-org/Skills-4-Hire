import type { AvailableServices } from '@/utils/types'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServicesCard from '@/components/services/ServicesCard'
import { groupedServicesByCategory } from '@/utils/format'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function AvailableServices() {
  const groupedServicesByCategoryArray = Object.entries(
    groupedServicesByCategory,
  )
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Available services" />
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
              },
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
