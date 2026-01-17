import Hero from '@/components/about/Hero'
import Mission from '@/components/about/Mission'
import CTA from '@/components/about/CTA'
import Container from '@/components/global/Container'
import Vision from '@/components/about/Vision'

function About2() {
  return (
    <div>
        <p style="display:none;">Redeploy test</p>
      <Hero />
      <Container>
        <Mission />
      </Container>
      <Vision />
      <Container>
        <CTA />
      </Container>
    </div>
  )
}
export default About2
