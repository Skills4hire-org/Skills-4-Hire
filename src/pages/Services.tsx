import { images } from '@/assets/data'
import SearchBar from '@/components/global/SearchBar'
import DesktopServicesHeader from '@/components/header/DesktopServicesHeader'
import MobileServicesHeader from '@/components/header/MobileServicesHeader'
import AvailableServiceCard from '@/components/services/AvailableServiceCard'
import ImageCarousel from '@/components/services/ImageCarousel'
import SectionHeading from '@/components/services/SectionHeading'
import ServiceAroundYouCard from '@/components/services/ServiceAroundYouCard'
import { availableServices, serviceAround } from '@/utils/database'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div className="space-y-6">
      <MobileServicesHeader />
      <DesktopServicesHeader />
      <div>
        <Link to="/customer/services/search">
          <SearchBar placeholder="Search service" maxWidth="w-full" />
        </Link>
      </div>

      <ImageCarousel images={images} />
      <section className="space-y-3 mb-6">
        <div className="flex items-center justify-between gap-6">
          <SectionHeading heading="Available services" />
          <Link
            to="available-services"
            className="text-xs text-primary underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-6 gap-4">
          {availableServices.slice(0, 6).map((service, index) => (
            <AvailableServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
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
          {serviceAround.slice(0, 2).map((service) => (
            <ServiceAroundYouCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </div>
  )
}
