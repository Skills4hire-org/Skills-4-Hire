import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import landingHero from '../../assets/images/landing-hero.jpg'
import Container from '../global/Container'

export default function CTA() {
  return (
    <Container>
      <div className="relative rounded-[8px] mt-16 mb-12 pt-12 pb-16 md:pt-16 md:pb-20 text-center px-4 overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
        <img
          src={landingHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Ready to hire trusted professionals or showcase your skills?
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
            Join Skills4Hire to connect, work, and grow whether you need help or
            offer expertise.
          </p>
          <Link
            to="/sign-up"
            className="group flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-medium rounded-[4px] bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Container>
  )
}
