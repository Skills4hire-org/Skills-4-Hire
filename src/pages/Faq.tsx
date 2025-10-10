import Container from "@/components/global/Container";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import { faqData } from "@/utils/database";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Faq() {
  const { title, faqs } = faqData;

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title={title} />
      <Container>
        <div className="mt-2 md:mt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem
                value={`faq-${index}`}
                key={index}
                className="border-b border-gray-100"
              >
                <AccordionTrigger className="flex justify-between items-center py-4 md:py-5">
                  <span className="text-sm md:text-base font-medium text-gray-800">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 md:pb-6 text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
