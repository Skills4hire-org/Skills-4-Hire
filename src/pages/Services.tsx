import MobileServicesOverviewHeader from '@/components/header/MobileServicesOverviewHeader'
import SectionHeading from '@/components/services/SectionHeading'
import { availableServices, serviceAround } from '@/utils/database'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ServicesCard from '@/components/services/ServicesCard'
import ReferAndEarnBanner from '@/components/services/ReferAndEarnBanner'
import DesktopServicesOverviewHeader from '@/components/header/DesktopServicesOverviewHeader'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Services() {
  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white">
        <MobileServicesOverviewHeader />
        <DesktopServicesOverviewHeader />
      </Container>

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
          <section className="space-y-3 pb-1.5">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Available services" />
              <Link
                to="available-services"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4">
              {availableServices.slice(0, 6).map((service, index) => (
                <ServicesCard key={index} {...service} />
              ))}
            </div>
          </section>
          <ReferAndEarnBanner />
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Services around you" />
              <Link
                to="services-around-you"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {serviceAround.slice(0, 4).map((service) => (
                <ServiceProviderCard key={service.id} {...service} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
