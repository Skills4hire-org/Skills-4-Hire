import { ChevronDown, Star, Heart } from 'lucide-react'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import SearchBar from '@/components/global/SearchBar'
import ProfileImage from '@/components/global/ProfileImage'
import { mockServices } from '@/assets/data'
import { useParams } from 'react-router-dom'

export default function SingleService() {
  const { service } = useParams()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden capitalize">
        <HeaderWithBackNavigation title={service} onlyMobile />
      </div>

      <Container className="py-3 md:py-6">
        <div className="md:hidden">
          <SearchBar placeholder="Search service" maxWidth="100%" />
        </div>

        <div className="hidden md:flex items-center justify-center gap-3">
          {['Another', 'Service', 'More', 'Rating'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 
              rounded-md text-sm w-28 cursor-pointer hover:bg-gray-50"
            >
              {label}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-10 md:pl-4 lg:pl-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-9 md:ml-0">
          {mockServices.map((service) => (
            <div key={service.id} className="relative">
              <div className="relative w-full overflow-visible rounded-2xl">
                <img
                  src={service.image}
                  className="w-[99%] md:w-[98.5%] mx-auto rounded-2xl object-cover h-40 sm:h-60 md:h-72 lg:h-80"
                />

                <button className="absolute top-3 right-7 bg-white/90 p-2 rounded-full shadow-sm z-30">
                  <Heart className="w-4 h-4 text-gray-700" />
                </button>

                <span
                  className="
                    absolute -bottom-4 sm:-bottom-5 md:-bottom-6 right-6 
                    bg-primary text-white 
                    text-xs sm:text-sm font-semibold 
                    px-3 py-2 sm:px-4 sm:py-3.5 
                    rounded-full shadow-lg z-30
                  "
                >
                  From ₦{service.priceFrom}
                </span>
              </div>

              <div className="mt-5 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-3">
                  <ProfileImage />

                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-800 flex items-center gap-2">
                      {service.provider}
                      <span className="text-primary text-[13px] italic font-medium">
                        Verified
                      </span>
                    </p>

                    <div className="flex items-center mt-0.5">
                      {[...Array(service.rating)].map((_, index) => (
                        <Star
                          key={index}
                          className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 md:text-right mt-1">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {service.excerpt}
                  </p>
                  <p className="text-xs sm:text-sm text-primary font-medium mt-1">
                    Dependable and Skilled
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
