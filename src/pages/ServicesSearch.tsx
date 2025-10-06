import SearchBar from '@/components/global/SearchBar'
import SectionHeading from '@/components/global/SectionHeading'
import ServiceAroundYouCard from '@/components/services/ServiceAroundYouCard'
import { serviceAround } from '@/utils/database'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServicesSearch() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Link
          to="/customer/services"
          className="flex items-center gap-1 -translate-x-2 absolute top-1/2 -translate-y-1/2"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>

        <div className="text-center">
          <SectionHeading heading="What are you looking for?" />
        </div>
      </div>
      <SearchBar
        placeholder="Search for services"
        maxWidth="w-full md:max-w-xl"
        autoFocus
      />
      <div className="space-y-6">
        <h2 className="text-base font-semibold ">Recommended for you</h2>
        <div className="grid grid-cols-1 gap-4">
          {serviceAround.map((service) => (
            <ServiceAroundYouCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}
