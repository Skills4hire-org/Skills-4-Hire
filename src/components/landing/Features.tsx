import { features } from '@/assets/data'
import Container from '../global/Container'
import { Icon } from '@iconify/react'

function Features() {
  return (
    <section>
      <div className="relative md:pb-12 md:pt-14">
        <Container className="text-white py-4 md:py-6 bg-[#161313] rounded-3xl md:rounded-br-none relative">
          <div className="space-y-6 md:space-y-8 px-2 md:-mt-14 z-40 relative">
            <div className="text-center space-y-2 md:space-y-4">
              <h2 className="text-2xl  md:text-3xl font-bold">
                Why Choose <span className="text-yellow-300">Skills4Hire</span>?
              </h2>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                Skills4Hire makes hiring and offering services simple, safe, and
                transparent with verified profiles, proof of work, secure
                payments, and trusted ratings in one platform.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
              {features.map(({ title, desc, icon }) => {
                return (
                  <li className="space-y-2">
                    <Icon
                      icon={icon}
                      width={30}
                      height={30}
                      className="text-yellow-300"
                    />
                    <h3 className="font-semibold text-sm md:text-base -mt-1">
                      {title}
                    </h3>
                    <p className="text-xs md:text-sm">{desc}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="bg-[#161313] h-0 md:h-12 w-1/2 md:w-1/3 absolute -bottom-11 right-0 [clip-path:polygon(0_0%,100%_0%,100%_100%,20%_100%)] rounded-br-3xl" />
          <div className="bg-[#161313] h-0 md:h-14 w-1/2 md:w-[65%] absolute -top-13 right-1/2 translate-x-1/2 z-30 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)]" />
        </Container>
      </div>
    </section>
  )
}
export default Features
