import SectionTitle from '../global/SectionTitle'

export default function Value() {
  return (
    <section className="space-y-12">
      <SectionTitle
        title1="What we"
        title2="Offer"
        desc="Whether you’re a customer or a provider, Skills4Hire is designed to fit
        your needs perfectly."
      />
      <div className="space-y-6 md:space-y-10">
        <div className=" space-y-6 md:flex gap-14 lg:gap-24">
          <div className="space-y-1.5 shrink-0">
            <h3 className="text-base md:text-xl font-bold">For Customers</h3>
            <p className="text-xs md:text-base">
              Easily browse services, post job requests, <br /> compare offers,
              and hire providers <br /> with secure payments all from <br />{' '}
              your personalized customer <br /> dashboard.
            </p>
          </div>
          <figure className="w-full h-64 md:h-76 bg-gray-300 rounded-3xl"></figure>
        </div>
        <div className=" space-y-6 md:flex items-end gap-14 lg:gap-24 md:flex-row-reverse">
          <div className="space-y-1.5 shrink-0 md:mb-1">
            <h3 className="text-base md:text-xl font-bold text-end">
              For Providers
            </h3>
            <p className="text-xs md:text-base text-end">
              Showcase your work, receive job offers, <br /> manage your
              services, and grow your <br /> earnings with powerful tools in the{' '}
              <br /> provider dashboard.
            </p>
          </div>
          <figure className="w-full h-64 md:h-76 bg-gray-300 rounded-3xl"></figure>
        </div>
      </div>
    </section>
  )
}
