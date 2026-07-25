import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import landingHero from '../../assets/images/landing-hero.jpg'
import { carouselServices } from '../../assets/data'
import Logo2 from '../global/Logo2'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const imageContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 } 
  },
}

export default function Hero() {
  const row1 = carouselServices.slice(0, Math.ceil(carouselServices.length / 2))
  const row2 = carouselServices.slice(Math.ceil(carouselServices.length / 2))

  return (
    <section
      id="index"
      className="min-h-[100vh] w-full flex flex-col items-center justify-start pt-6 pb-8"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-4xl px-4"
      >
        {/* Top Highlight Tag */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start mx-auto">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">Ecosystem for skilled professionals</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[60px] font-semibold tracking-tighter leading-[1.1] md:leading-[1.0] mb-4 md:mb-6 text-foreground">
          Find the right skills.<br />
          <span className="text-primary">Connect.</span> Get it done.
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-sm md:text-base lg:text-[16px] font-normal text-muted-foreground max-w-[580px] leading-relaxed mb-6 mx-auto">
          Connect with verified professionals, showcase your work and pay
          securely, all in one platform. From local services to digital expertise.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            to="/sign-up"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm md:text-[16px] font-medium rounded-[4px] bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/sign-in"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm md:text-[16px] font-medium rounded-[4px] bg-transparent text-primary border border-primary hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5"
          >
            Sign In
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Banner Image Area */}
      <motion.div 
        variants={imageContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full mt-10 md:mt-16 lg:mt-20 flex-1 relative rounded-2xl overflow-hidden min-h-[350px] md:min-h-[500px] flex items-end justify-start text-left p-4 md:p-8 lg:p-12 shadow-2xl"
      >
        {/* Background Image */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          src={landingHero} 
          alt="Skills-4-Hire Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top-Left Pill */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/60 backdrop-blur-md border border-white/60 px-3 md:px-4 py-1.5 md:py-2 rounded-[8px] flex items-center gap-2 md:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="hidden md:flex items-center"><Logo2 size="h-5" /></div>
          <span className="text-xs md:text-sm font-medium text-gray-900">Ecosystem for skilled professionals</span>
        </div>



        {/* Content Overlays */}
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 md:gap-10">
          
          {/* Bottom Left Text */}
          <div className="max-w-md w-full">
            <span className="inline-block border border-white/30 text-white/90 rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium mb-2 md:mb-4 bg-white/10 backdrop-blur-sm">
              About us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 md:mb-3 leading-tight tracking-tight">
              We are Skills4Hire.
            </h2>
            <p className="text-sm md:text-[18px] text-white/80 leading-relaxed max-w-[280px] md:max-w-full">
              The operating system for vocational and digital skills, we simplify hiring and getting hired with confidence.
            </p>
          </div>

          {/* Bottom Right Floating Services Ticker */}
          <div 
            className="hidden lg:flex flex-col gap-4 mb-4 w-1/2 overflow-hidden" 
            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)' }}
          >
            {/* Top row - moving left */}
            <div className="flex gap-4 items-center w-max animate-ticker-left" style={{ animationDuration: '56s' }}>
              {[...row1, ...row1].map(({ image, text }, i) => (
                <HeroServiceCard key={`top-${i}`} image={image} text={text} />
              ))}
            </div>
            {/* Bottom row - moving right */}
            <div className="flex gap-4 items-center w-max animate-ticker-right" style={{ animationDuration: '56s' }}>
              {[...row2, ...row2].map(({ image, text }, i) => (
                <HeroServiceCard key={`bottom-${i}`} image={image} text={text} />
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* Mobile Services Ticker (Below Image) */}
      <div 
        className="w-full mt-8 flex lg:hidden flex-col gap-4 overflow-hidden" 
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex gap-4 items-center w-max animate-ticker-left" style={{ animationDuration: '56s' }}>
          {[...row1, ...row1].map(({ image, text }, i) => (
            <HeroServiceCard key={`mobile-top-${i}`} image={image} text={text} />
          ))}
        </div>
        <div className="flex gap-4 items-center w-max animate-ticker-right" style={{ animationDuration: '56s' }}>
          {[...row2, ...row2].map(({ image, text }, i) => (
            <HeroServiceCard key={`mobile-bottom-${i}`} image={image} text={text} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroServiceCard({ image, text }: { image: string, text: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl shrink-0 w-[140px] h-[95px] shadow-sm group border border-border">
      <img
        src={image}
        alt={text}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      
      <div className="absolute top-2 left-2 max-w-[calc(100%-16px)]">
        <span className="inline-block bg-white/60 backdrop-blur-md border border-white/60 text-gray-900 text-[10px] font-semibold px-2.5 py-1 rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] truncate max-w-full">
          {text}
        </span>
      </div>
    </div>
  )
}
