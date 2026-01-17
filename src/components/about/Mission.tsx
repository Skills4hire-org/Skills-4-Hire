import SectionTitle from '../global/SectionTitle'

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

      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <div className="bg-gray-300  rounded-sm col-span-2 row-span-2" />
        <div className="bg-gray-300 h-32 md:h-40  rounded-sm col-span-2" />
        <div className="bg-gray-300 h-32 md:h-40  rounded-sm" />
        <div className="bg-gray-300 h-32 md:h-40  rounded-sm" />
      </div>
    </section>
  )
}
