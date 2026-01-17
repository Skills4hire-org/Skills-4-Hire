import Container from '@/components/global/Container'
import { privacyPolicyData, termsPageData } from '@/utils/database'
import { Link, useSearchParams } from 'react-router-dom'

function Legal() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  return (
    <Container>
      <div className="flex flex-col md:flex-row md:gap-16 gap-8  pb-10 pt-4 md:pt-6">
        <div className="space-y-3 shrink-0">
          <h1 className="text-xs md:text-sm uppercase ">legal</h1>
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 text-xs md:text-sm">
            <Link to="/legal?type=terms-conditions">
              <button
                className={`px-2 py-1.5  rounded-md ${
                  type == 'terms-conditions'
                    ? 'font-medium bg-[#D3F39B]'
                    : 'font-normal'
                }`}
              >
                Terms & Conditions
              </button>
            </Link>

            <Link to="/legal?type=privacy-policy">
              <button
                className={`px-2 py-1.5  rounded-md ${
                  type == 'privacy-policy'
                    ? 'font-medium bg-[#D3F39B]'
                    : 'font-normal'
                }`}
              >
                Privacy Policy
              </button>
            </Link>
          </div>
        </div>
        {type == 'terms-conditions' ? (
          <div className=" text-gray-700 text-sm md:text-base leading-relaxed space-y-2 md:space-y-4">
            {termsPageData.description.map((para, index) => (
              <p key={index} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-4">
            {privacyPolicyData.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
export default Legal
