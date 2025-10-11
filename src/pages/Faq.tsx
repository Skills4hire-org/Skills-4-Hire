import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { faqData } from '@/utils/database'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function Faq() {
  const { title, faqs } = faqData

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />
      <Container className="pt-2 md:pt-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <AccordionItem
              value={`faq-${index}`}
              key={index}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="flex justify-between items-center pt-0 py-2 md:py-4 mb-2 md:mb-4">
                <span className="text-sm md:text-base font-medium text-gray-800 ">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line md:pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </div>
  )
}
