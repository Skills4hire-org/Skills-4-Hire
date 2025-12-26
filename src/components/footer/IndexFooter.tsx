import { footer, socialLinks } from '@/assets/data'
import Container from '../global/Container'
import Logo from '../global/Logo'
import FooterLink from './FooterLink'
import { Separator } from '../ui/separator'
import SocialLink from './SocialLink'

export default function IndexFooter() {
  return (
    <footer className="text-white bg-black">
      <Container className="py-4">
        <div className="grid md:grid-cols-5 gap-y-8 gap-x-12">
          <div className="space-y-2.5 md:col-span-2">
            <Logo size="h-6.5" />
            <p className="text-xs md: ">
              Connecthing Skills and Opportunities, Once Hire at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 md:gap-4 md:col-span-3">
            {footer.footerLinks.map((linksGroup) => (
              <FooterLink key={linksGroup.heading} {...linksGroup} />
            ))}
          </div>
        </div>
      </Container>
      <Separator className="text-muted-foreground" />
      <Container className="py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-between">
          <p className="text-sm">
            &copy; 2025 Skills4Hire. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center mb-2">
            {socialLinks.map((socials) => (
              <SocialLink key={socials.id} {...socials} />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
