import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Swiper
      className="rounded-4xl "
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative">
            <img
              src={img}
              alt={`slide-${idx}`}
              className="w-full max-h-64 lg:max-h-92 object-cover rounded-4xl"
            />
            <div className="absolute inset-0 bg-black/10 rounded-4xl" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
