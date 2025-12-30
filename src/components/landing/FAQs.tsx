import Container from '../global/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { faqs } from '@/assets/data'
import { Minus, Plus } from 'lucide-react'
export default function FAQs() {
  return (
    <section id="faqs">
      <div className="relative pt-7 md:pt-11">
        <Container className={`bg-[#161313] py-8 rounded-b-3xl rounded-tr-3xl`}>
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 px-2">
            <div className="space-y-3">
              <h2 className="text-xs bg-white md:text-sm font-normal w-max rounded-md px-3.5 py-0.5">
                Help
              </h2>
              <div className="">
                <h3 className="text-2xl  md:text-3xl font-medium mb-4 text-white">
                  Frequently Asked{' '}
                  <span className="text-yellow-300">Questions</span>
                </h3>
                <p className="text-sm md:text-base mb-5 max-w-sm text-white ">
                  Find quick answers to common questions about using
                  Skills4Hire. From posting jobs to secure payments, here’s
                  everything you need to get started with confidence.
                </p>
                <button className="bg-yellow-300 rounded-md px-6 py-1.5 text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full text-white space-y-3"
              defaultValue=""
            >
              {faqs.map(({ trigger }, index) => {
                return (
                  <AccordionItem
                    value={`item-${index + 1}`}
                    key={index}
                    className=""
                  >
                    <AccordionTrigger asChild>
                      <div className="group flex items-center gap-3 pr-3 text-sm bg-[#383838] rounded-md overflow-hidden w-full hover:cursor-pointer font-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                        <span className="w-10 h-10 flex items-center justify-center bg-[#575656] rounded-r-md">
                          {/* Plus (closed state) */}
                          <Plus
                            strokeWidth={4}
                            className="h-4 w-4 transition-transform duration-200 
               group-data-[state=open]:opacity-0"
                          />

                          {/* Minus (open state) */}
                          <Minus
                            strokeWidth={4}
                            className="h-4 w-4 transition duration-200 
               group-data-[state=open]:opacity-100 absolute"
                          />
                        </span>
                        <h3>{trigger}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden mt-2 ">
                      d'pfwepfwflpefp
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </Container>
        <div className="bg-[#161313] h-8 md:h-12 w-1/2 md:w-1/3  absolute top-0 [clip-path:polygon(0_0%,80%_0%,100%_100%,0_100%)] rounded-tl-3xl" />
      </div>
    </section>
  )
}
