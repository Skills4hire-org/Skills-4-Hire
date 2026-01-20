import SectionTitle from '../global/SectionTitle'
import rightCurve from '../../assets/images/right-curve.png'
import leftCurve from '../../assets/images/left-curve.png'
import { howItWorks } from '../../assets/data'

export default function HowItWorks() {
  return (
    <section className="space-y-5 md:space-y-10 md:pb-14">
      <SectionTitle
        title1="How it"
        title2="works"
        desc="Getting started is simple, just three easy steps for customers and providers."
      />
      <div className="space-y-8 md:space-y-12">
        <div className="grid md:grid-cols-2  gap-2 place-items-center relative">
          <h3 className="text-xl font-bold md:order-2 md:text-3xl">
            Customers
          </h3>
          <div className="relative w-full">
            <div className="bg-white w-full h-40 rounded-lg md:order-1 shadow-lg px-2 py-4 md:p-4 flex items-center">
              <ul className="space-y-2">
                {howItWorks.customer.map((step, index) => {
                  return (
                    <li className="flex items-center gap-2 text-xs ">
                      <span className="bg-primary text-xs  py-1 px-2 text-white rounded-[5px]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  )
                })}
              </ul>
            </div>
            <img
              src={rightCurve}
              alt="right curve"
              className="absolute -right-14 top-0 h-52 z-40 hidden md:block"
            />
            <div className="w-7 h-7 bg-primary border-5 border-white absolute -top-3 -right-3 rounded-full z-30  hidden md:block" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 place-items-center gap-2">
          <h3 className="text-xl md:text-3xl font-bold">Providers</h3>
          <div className="relative w-full">
            <div className="bg-white w-full h-40 rounded-lg shadow-lg px-2 py-4 md:p-4 flex items-center">
              <ul className="space-y-2">
                {howItWorks.provider.map((step, index) => {
                  return (
                    <li className="flex items-center gap-2 text-xs ">
                      <span className="bg-primary text-xs  py-1 px-2 text-white rounded-[5px]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  )
                })}
              </ul>
            </div>
            <img
              src={leftCurve}
              alt="left curve"
              className="absolute -left-14 top-1 h-50 z-40 hidden md:block"
            />
            <div className="w-7 h-7 bg-primary border-5 border-white absolute -top-3 -left-3 rounded-full z-30 hidden md:block" />
          </div>
        </div>
        <div className="grid md:grid-cols-2  gap-2 place-items-center relative">
          <h3 className="text-xl font-bold md:order-2 md:text-3xl ">
            The Platform
          </h3>
          <div className="relative w-full">
            <div className="bg-white w-full h-40 rounded-lg md:order-1 shadow-lg px-2 py-4 md:p-4 flex items-center ">
              <ul className="space-y-2">
                {howItWorks.platform.map((step, index) => {
                  return (
                    <li className="flex items-center gap-2 text-xs ">
                      <span className="bg-primary text-xs  py-1 px-2 text-white rounded-[5px]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="w-7 h-7 bg-primary border-5 border-white absolute -top-3.5 -right-2.5 rounded-full z-30 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
