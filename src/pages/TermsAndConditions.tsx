import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { termsPageData } from '@/utils/database'

export default function TermsAndConditions() {
  const { title, description } = termsPageData

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />
      <Container>
        <div className="mt-2 md:mt-4 text-gray-700 text-sm md:text-base leading-relaxed space-y-2 md:space-y-4">
          {description.map((para, index) => (
            <p key={index} className="whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>
      </Container>
    </div>
  )
}
