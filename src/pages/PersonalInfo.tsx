import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function PersonalInfo() {
  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Personal Information" />
      <Container>
        <PersonalInfoForm />
      </Container>
    </div>
  )
}
