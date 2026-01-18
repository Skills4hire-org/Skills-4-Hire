import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={12}
      slidesPerView="auto"
      centeredSlides={false}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="w-full h-[200px]"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((_, index) => (
        <SwiperSlide key={index} className="!w-[120px]">
          <figure
            key={index}
            className={` h-[150px] bg-gray-300 ${
              index % 2 !== 0 && 'translate-y-12'
            }  rounded-3xl`}
          ></figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
