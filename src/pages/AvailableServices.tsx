import SearchBar from '@/components/global/SearchBar'
import AvailableServiceCard from '@/components/services/AvailableServiceCard'
import SectionHeading from '@/components/global/SectionHeading'
import { availableServices } from '@/utils/database'
import type { AvailableServices } from '@/utils/types'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'

export default function AvailableServices() {
  const groupedServicesByCategory = availableServices.reduce((acc, current) => {
    ;(acc[current.category] ??= []).push(current)
    return acc
  }, {} as Record<string, AvailableServices[]>)
  const groupedServicesByCategoryArray = Object.entries(
    groupedServicesByCategory
  )
  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white py-1 md:py-4">
        <header className="relative">
          <Link
            to="/customer/services"
            className="flex items-center gap-1 -translate-x-2 absolute top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>

          <div className=" text-center">
            <SectionHeading heading="Available services" />
          </div>
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
                      <AvailableServiceCard
                        key={service.serviceName}
                        {...service}
                      />
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
