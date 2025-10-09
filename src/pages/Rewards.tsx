import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import RewardCard from '@/components/rewards/RewardCard'
import { rewardPoints } from '@/utils/database'
import { dateFormatter } from '@/utils/format'
import { HandCoins } from 'lucide-react'
import { TbAward } from 'react-icons/tb'

export default function Rewards() {
  return (
    <>
      <div className="mb-2 md:hidden">
        <HeaderWithBackNavigation title="Rewards" onlyMobile />
      </div>
      <div className="px-2 md:px-0">
        <Container className="bg-primary rounded-t-md md:rounded-t-none pt-2 pb-4 md:py-8 px-6 md:px-12 text-white capitalize relative">
          <div className="space-y-4 md:space-y-8">
            <h2 className=" text-center text-sm md:text-base">
              your rewards for your jobs done
            </h2>
            <div className="flex flex-col items-center gap-1 ">
              <h3 className="text-xs md:text-sm ">service points</h3>
              <span className="text-3xl md:text-4xl flex items-center gap-1 md:gap-1.5">
                <HandCoins className="w-6 h-6 md:w-7 md:h-7" /> 0
              </span>
            </div>
          </div>
          <TbAward
            strokeWidth={1}
            className="w-13 h-13 md:w-24 md:h-24 absolute -top-1.5 -right-2 md:-top-2.5 md:-right-4   text-white/10 rotate-30"
          />
        </Container>
        <Container className="bg-black text-white py-2 md:py-3 text-xs md:text:sm rounded-b-md md:rounded-b-none text-center">
          <p> Latest update: {dateFormatter(Date.now())}</p>
        </Container>
      </div>
      <Container>
        <div className="space-y-4">
          <h2 className="text-center text-sm pt-0.5 md:pt-1 md:text-base">
            Member exclusive benefits
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4">
            {rewardPoints.map((reward, index) => (
              <RewardCard key={index} {...reward} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
