import Container from '@/components/global/Container'
import Contact from '@/components/landing/Contact'
import FAQs from '@/components/landing/FAQs'
import Features from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'
import ScrollToSection from '@/components/landing/ScrollToSection'

export default function Landing() {
  return (
    <>
      <ScrollToSection />
      <Container>
        <div className="space-y-10 pb-10 pt-4 md:pt-6">
          <Hero />
          <Features />
          <FAQs />
          <Contact />
        </div>
      </Container>
    </>
  )
}
