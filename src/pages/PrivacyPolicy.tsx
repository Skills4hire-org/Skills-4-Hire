import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { privacyPolicyData } from '@/utils/database'

export default function PrivacyPolicy() {
  const { title, description } = privacyPolicyData

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />
      <Container>
        <div className="mt-2 md:mt-4 text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-4">
          {description.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </Container>
    </div>
  )
}
