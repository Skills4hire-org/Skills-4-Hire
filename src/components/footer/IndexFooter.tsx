import { footerLinks, socialLinks } from '@/assets/data'
import Logo from '../global/Logo'
import FooterLink from './FooterLink'
import SocialLink from './SocialLink'
import ShaderBackground from '../global/ShaderBackground'

export default function IndexFooter() {
  return (
    <footer className="w-full relative py-16 md:py-24 px-4 sm:px-8 flex justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShaderBackground />
      </div>
      <div className="w-full max-w-7xl relative z-10">
        
        {/* Main Blueprint Container */}
        <div className="relative border border-white/20 p-8 md:p-12">
          
          {/* Top Left Corner */}
          <div className="absolute top-0 left-6 md:left-12 w-[1px] h-6 -translate-y-full bg-white/20" />
          <div className="absolute top-6 md:top-12 left-0 h-[1px] w-6 -translate-x-full bg-white/20" />
          
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-6 md:left-12 w-[1px] h-6 translate-y-full bg-white/20" />
          <div className="absolute bottom-6 md:bottom-12 left-0 h-[1px] w-6 -translate-x-full bg-white/20" />

          {/* Top Right Corner */}
          <div className="absolute top-0 right-6 md:right-12 w-[1px] h-6 -translate-y-full bg-white/20" />
          <div className="absolute top-6 md:top-12 right-0 h-[1px] w-6 translate-x-full bg-white/20" />

          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-6 md:right-12 w-[1px] h-6 translate-y-full bg-white/20" />
          <div className="absolute bottom-6 md:bottom-12 right-0 h-[1px] w-6 translate-x-full bg-white/20" />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Left: Logo & Text */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-6">
              <Logo size="h-8" />
              <p className="text-sm text-white/70 leading-relaxed max-w-[280px]">
                Connecting skills and opportunities seamlessly. Optimize your service delivery and hiring with our industry-leading platform.
              </p>
            </div>

            {/* Middle: Links */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {footerLinks.map((linksGroup) => (
                <div key={linksGroup.heading} className="w-full">
                  <FooterLink {...linksGroup} />
                </div>
              ))}
            </div>

            {/* Right: Socials & Copyright */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between min-h-[160px]">
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map((socials) => (
                  <SocialLink key={socials.id} {...socials} />
                ))}
              </div>
              
              <div className="text-xs text-white/50 font-medium tracking-wide lg:text-right mt-12 lg:mt-0">
                All rights reserved {new Date().getFullYear()}@skills4hire
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
