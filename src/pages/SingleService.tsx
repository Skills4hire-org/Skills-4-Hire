import { ChevronDown, Star, Heart } from "lucide-react";
import Container from "@/components/global/Container";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import SearchBar from "@/components/global/SearchBar";
import ProfileImage from "@/components/global/ProfileImage";
import { mockServices } from "@/assets/data";

export default function SingleService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden">
        <HeaderWithBackNavigation title="Plumber" onlyMobile />
      </div>

      <Container className="py-3 md:py-6">
        <div className="md:hidden">
          <SearchBar placeholder="Search service" maxWidth="100%" />
        </div>

        <div className="hidden md:flex items-center justify-center gap-3">
          {["Another", "Service", "More", "Rating"].map((label) => (
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

      <Container className="pb-12 md:pl-4 lg:pl-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 md:ml-0">
          {mockServices.map((service) => (
            <div key={service.id} className="relative">
              <div className="relative w-full overflow-visible rounded-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-[99%] md:w-[98.5%] mx-auto rounded-2xl object-cover h-56 sm:h-64 md:h-76 lg:h-80"
                />

                <span
                  className="absolute top-3 left-5 bg-black/50 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full 
               backdrop-blur-md shadow-md z-30 whitespace-nowrap max-w-[90%] overflow-visible"
                >
                  {service.title}
                </span>

                <button className="absolute top-3 right-7 bg-white/90 p-2 rounded-full shadow-sm z-30">
                  <Heart className="w-4 h-4 text-gray-700" />
                </button>

                <span className="absolute -bottom-7 right-8 bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-lg z-30">
                  From ₦{service.priceFrom}
                </span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ProfileImage />

                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-800 flex items-center gap-2">
                      {service.provider}
                      <span className="inline-block w-3.5 h-3.5 bg-green-500 rounded-full"></span>
                    </p>

                    <p className="text-primary text-[13px] italic font-medium mt-0.5">
                      Verified
                    </p>

                    <div className="flex items-center mt-1">
                      {[...Array(service.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 md:text-right">
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
  );
}
