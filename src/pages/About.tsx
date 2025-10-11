import Container from '@/components/global/Container'
import { aboutPageData } from '@/utils/database'
import { aboutContactOptions, socialLinks } from '@/assets/data'

import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import Logo2 from '@/components/global/Logo2'

export default function About() {
  const { title, subtitle, description } = aboutPageData

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />

      <Container>
        <div className="space-y-2 md:space-y-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className=" space-y-1.5 md:space-y-3">
              <div className="mx-auto w-max">
                <Logo2 />
              </div>
              <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
            </div>
            <div className="flex items-center gap-10 flex-wrap justify-center mb-2">
              {aboutContactOptions.map(({ icon: Icon, text, url }) => (
                <a
                  key={text}
                  href={url}
                  className="flex flex-col items-center text-gray-600 hover:text-primary transition"
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6 mb-1" />
                  <span className="text-xs md:text-sm font-normal">{text}</span>
                </a>
              ))}
            </div>
          </div>
          <div className=" text-sm md:text-base text-gray-700 leading-relaxed space-y-2 md:space-y-4">
            {description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
          <div className="flex items-center gap-4 md:gap-6 md:gap-8 flex-wrap justify-center py-4">
            {socialLinks.map(({ id, href, Icon, bgClass }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={id}
                className="transition transform hover:-translate-y-1"
              >
                <div
                  className={`${bgClass} p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                >
                  <Icon className="text-white h-5 w-5 md:h-6 md:w-6" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
