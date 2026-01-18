import Container from '@/components/global/Container'
import About from '@/components/landing/About'
import Contact from '@/components/landing/Contact'
import FAQs from '@/components/landing/FAQs'
import Features from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import ScrollToSection from '@/components/landing/ScrollToSection'
import Services from '@/components/landing/Services'
import Value from '@/components/landing/Value'

export default function Landing() {
  return (
    <>
      <ScrollToSection />
      <Container>
        <div className="space-y-10 pb-10 pt-4 md:pt-6">
          <Hero />
          <About />
          <Services />
          <Value />
          <HowItWorks />
          <Features />
          <FAQs />
          <Contact />
        </div>
      </Container>
    </>
  )
}
