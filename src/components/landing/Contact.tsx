import { contact } from '@/assets/data'
import ContactForm from '../form/ContactForm'
import Container from '../global/Container'
import bg from '../../assets/images/contactBg.png'

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-cover bg-center rounded-3xl"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Container className={`py-10`}>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 px-2 ">
          <div className="space-y-2">
            <h2 className="text-sm uppercase md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#222bde] to-[#0aeff7] w-max">
              contact us
            </h2>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Get in Touch with Us
              </h3>
              <p className="text-sm md:text-base mb-5 max-w-sm">
                Have more questions or need assistance? Our team is here to
                help.
              </p>
              <ul className="space-y-4 max-w-sm">
                {contact.map(({ icon, label, url, text }) => {
                  const IconComponent = icon
                  return (
                    <li className="bg-white rounded-sm p-2 flex items-center gap-2">
                      <div className="p-1.5 rounded-sm bg-primary/10">
                        <IconComponent
                          strokeWidth={1}
                          className="w-5 h-5 text-primary"
                        />
                      </div>
                      <div className="text-xs">
                        <span className="block capitalize">{label}</span>
                        <a href={url} className="text-primary hover:underline">
                          {text}
                        </a>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
