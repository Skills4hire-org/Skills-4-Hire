import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="py-10 text-center space-y-8 md:space-y-10">
      <p className="text-2xl md:text-4xl/12 font-semibold">
        Join us in transforming <br />
        the future of work!
      </p>
      <div className="space-x-4 md:space-x-6">
        <Link to="/sign-up">
          <button className="bg-[#161313] hover:bg-[#161313]/80 cursor-pointer text-white rounded-sm h-9 text-sm md:text-base w-32">
            Get Started
          </button>
        </Link>
        <Link to="/?section=contact">
          <button className=" border border-[#161313] hover:border-background hover:shadow-sm text-[#161313] cursor-pointer rounded-sm h-9 text-sm md:text-base w-32">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  )
}
