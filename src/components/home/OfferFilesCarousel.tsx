import { Download } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

/* interface CategoriesCarouselProp {
  images: string[]
} */

function OfferFilesCarousel() {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full h-max px-6 my-4"
      >
        <CarouselContent className="pl-2">
          {[1, 2].map((_, index) => (
            <CarouselItem key={index} className={`basis-auto pl-2`}>
              <button className="flex items-center gap-3 md:gap-4 border border-primary/20 py-1 md:py-1.5 px-2 rounded-full w-max text-xs md:text-sm cursor-pointer font-medium">
                <span className=" text-red-600 font-bold">PDF</span>
                result.pdf
                <Download className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </button>
            </CarouselItem>
          ))}
          {[1, 2].map((_, index) => (
            <CarouselItem key={index} className={`basis-auto pl-2`}>
              <button className="flex items-center gap-3 md:gap-4 border border-primary/20 py-1 md:py-1.5 px-2 rounded-full w-max text-xs md:text-sm cursor-pointer font-medium">
                <span className=" text-blue-600 font-bold">DOC</span>
                result.doc
                <Download className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size="lg"
          className={`-left-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none  `}
        />
        <CarouselNext
          variant="ghost"
          className={`-right-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none`}
        />
      </Carousel>
    </div>
  )
}
export default OfferFilesCarousel
