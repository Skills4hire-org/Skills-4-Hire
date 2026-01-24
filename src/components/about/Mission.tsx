import SectionTitle from '../global/SectionTitle'
import image1 from '../../assets/images/archi.webp'
import image2 from '../../assets/images/coding.webp'
import image3 from '../../assets/images/games.webp'
import image4 from '../../assets/images/welding.webp'

export default function Mission() {
  return (
    <section className="pb-10 space-y-6 md:space-y-8">
      <SectionTitle
        title1="our"
        title2="mission"
        desc="To make it easy, safe, and rewarding for anyone to hire trusted
                  service providers while empowering service providers to showcase
                  their skills, grow their business and earn more."
      />

      <div className="grid grid-cols-4 gap-2 md:gap-3 ">
        <figure className="bg-gray-300  rounded-sm col-span-2 row-span-2 overflow-hidden w-full h-full">
          <img
            loading="lazy"
            src={image1}
            alt="archi"
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <figure className="bg-gray-300  rounded-sm col-span-2 overflow-hidden w-full max-h-[300px]">
          <img
            loading="lazy"
            src={image2}
            alt="coding"
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <figure className="bg-gray-300  rounded-sm overflow-hidden w-full h-full">
          <img
            loading="lazy"
            src={image3}
            alt="games"
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <figure className="bg-gray-300  rounded-sm overflow-hidden w-full h-full">
          <img
            loading="lazy"
            src={image4}
            alt="welding"
            className="object-cover object-center w-full h-full"
          />
        </figure>
      </div>
    </section>
  )
}
