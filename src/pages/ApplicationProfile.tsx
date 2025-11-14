import ApplicationProfileForm from '@/components/form/ApplicationProfileForm'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function ApplicationProfile() {
  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Application Profile" />
      <Container>
        <div className="max-w-lg mx-auto space-y-6 md:space-y-8">
          <ApplicationProfileForm />
        </div>
      </Container>
    </div>
  )
}
