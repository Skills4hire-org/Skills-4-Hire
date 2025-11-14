import ExperienceForm from '@/components/form/ExperienceForm'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function Experience() {
  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Experience" />
      <Container>
        <div className="max-w-lg mx-auto space-y-6 md:space-y-8">
          <ExperienceForm />
        </div>
      </Container>
    </div>
  )
}
