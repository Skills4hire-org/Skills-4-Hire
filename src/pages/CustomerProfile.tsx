import CustomerProfileForm from '@/components/form/CustomerProfileForm'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function CustomerProfile() {
  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Profile" />
      <Container>
        <CustomerProfileForm />
      </Container>
    </div>
  )
}
