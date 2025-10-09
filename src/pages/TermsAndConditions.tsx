import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { termsPageData } from '@/utils/database'

export default function TermsAndConditions() {
  const { title, description } = termsPageData

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />
      <Container>
        <div className="mt-4 md:mt-6 text-gray-700 text-sm md:text-base leading-relaxed px-2 md:px-6 space-y-5 text-justify">
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
