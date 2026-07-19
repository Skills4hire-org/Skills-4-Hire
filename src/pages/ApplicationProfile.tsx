import ApplicationProfileForm from '@/components/form/ApplicationProfileForm'
import AuthLogo from '@/components/global/AuthLogo'
import Container from '@/components/global/Container'

export default function ApplicationProfile() {
  return (
    <Container className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-lg text-center">
        <div className="w-max mx-auto mb-4">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Complete Registration</h1>
        <div className="mt-8">
          <ApplicationProfileForm />
        </div>
      </div>
    </Container>
  )
}
