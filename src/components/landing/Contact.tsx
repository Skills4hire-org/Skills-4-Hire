import { contact } from '@/assets/data'
import ContactForm from '../form/ContactForm'
import Container from '../global/Container'
import { MapPin } from 'lucide-react'

/** Static address entry displayed alongside the dynamic `contact` data items. */
const address = {
  label: 'Address',
  text: 'Ogunsola street, Ogba, Lagos.',
  Icon: MapPin,
}

export default function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">

          {/* Left Column: Text & Info */}
          <div className="flex flex-col h-full pt-4 md:pt-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-slate-900 leading-[1.05] mb-6">
              Talk to our <br />
              support team
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[360px] mb-12 md:mb-auto">
              Have more questions or need assistance? Our team is here to help
            </p>

            {/* Contact Info — sourced from data.ts + static address */}
            <ul className="space-y-5 md:space-y-6 mt-12 md:mt-24">
              {contact.map(({ label, text, url, icon: Icon }) => (
                <li key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[8px] bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href={url}
                    className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}

              {/* Static address entry */}
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[8px] bg-primary/20 flex items-center justify-center shrink-0">
                  <address.Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {address.text}
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Form */}
          <div className="bg-primary/20 rounded-[8px] p-6 md:p-8 border border-primary/20">
            <ContactForm />
          </div>

        </div>
      </Container>
    </section>
  )
}
