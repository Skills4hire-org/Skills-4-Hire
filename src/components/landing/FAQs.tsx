import Container from '../global/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { faqs } from '@/assets/data'
import { Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function FAQs() {
  return (
    <section id="faqs" className="w-full py-16 md:py-24 bg-[#fafafa]">
      <Container>
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_1.1fr] items-start">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:sticky lg:top-24"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start mx-auto">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium tracking-tight text-slate-900 leading-[1.2] mb-4 md:mb-6">
                Frequently Asked <br className="hidden md:block"/>
                Questions
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[400px]">
                Find quick answers to common questions about using Skills4Hire. From posting jobs to secure payments, here’s everything you need to get started with confidence.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Accordions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3 md:space-y-4"
              defaultValue="item-1"
            >
              {faqs.map(({ trigger, desc1, desc2, desc3 }, index) => {
                return (
                  <motion.div variants={itemVariants} key={index}>
                    <AccordionItem
                      value={`item-${index + 1}`}
                      className="bg-white rounded-[4px] border border-gray-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    >
                      <AccordionTrigger asChild>
                        <div className="group flex items-start sm:items-center justify-between gap-4 p-5 md:p-6 w-full hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-[4px]">
                          <h3 className="text-left text-sm md:text-[15px] font-semibold text-slate-800 leading-snug">
                            {trigger}
                          </h3>
                          <span className="shrink-0 flex items-center justify-center text-slate-400">
                            <Plus className="w-5 h-5 group-data-[state=open]:hidden" strokeWidth={1.5} />
                            <Minus className="w-5 h-5 hidden group-data-[state=open]:block text-slate-800" strokeWidth={1.5} />
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-sm text-slate-500 leading-relaxed px-5 md:px-6 pb-5 md:pb-6">
                        <div className="space-y-3">
                          <p>{desc1}</p>
                          {desc2 && <p>{desc2}</p>}
                          {desc3 && <p>{desc3}</p>}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                )
              })}
            </Accordion>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
