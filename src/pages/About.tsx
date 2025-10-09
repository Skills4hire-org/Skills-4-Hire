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
        <div className="flex flex-col items-center text-center mt-2 md:mt-4">
          <Logo2 />

          <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>

          <div className="flex items-center gap-10 mt-4 md:mt-6 flex-wrap justify-center">
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

        <div className="mt-6 text-sm md:text-base text-gray-700 text-justify leading-relaxed px-2 md:px-6 space-y-4">
          {description.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
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
