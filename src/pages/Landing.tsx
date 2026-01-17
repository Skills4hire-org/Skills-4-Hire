import Contact from '@/components/landing/Contact'
import FAQs from '@/components/landing/FAQs'
import Features from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'

export default function Landing() {
  return (
    <div className="space-y-10 pb-10 pt-4 md:pt-6">
      <Hero />
      <Features />
      <FAQs />
      <Contact />
    </div>
  )
}
