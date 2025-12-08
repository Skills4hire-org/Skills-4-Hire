import SearchBar from '@/components/global/SearchBar'
import MobileServicesOverviewHeader from '@/components/header/MobileServicesOverviewHeader'
import SectionHeading from '@/components/services/SectionHeading'
import { availableServices, serviceAround } from '@/utils/database'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ServicesCard from '@/components/services/ServicesCard'
import ReferAndEarnBanner from '@/components/services/ReferAndEarnBanner'
import DesktopServicesOverviewHeader from '@/components/header/DesktopServicesOverviewHeader'

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
              <SearchBar placeholder="Search for services" maxWidth="w-full" />
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
