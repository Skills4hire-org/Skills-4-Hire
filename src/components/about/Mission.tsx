import { motion } from 'framer-motion'
import Container from '../global/Container'
import image1 from '../../assets/images/archi.webp'
import image2 from '../../assets/images/coding.webp'
import image3 from '../../assets/images/games.webp'
import image4 from '../../assets/images/welding.webp'

export default function Mission() {
  return (
    <section className="py-16 md:py-20 bg-[#0f172a] w-full">
      <Container>
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-16">
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Our Mission</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-[60px] font-semibold tracking-tighter leading-[1.1] md:leading-[1.0] text-white capitalize">
            our <span className="text-primary">mission</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base lg:text-[16px] font-normal text-white/60 leading-relaxed max-w-[580px] mx-auto mt-4">
            To make it easy, safe, and rewarding for anyone to hire trusted
            service providers while empowering service providers to showcase
            their skills, grow their business and earn more.
          </p>
        </div>

        {/* 4-Image Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto auto-rows-[160px] md:auto-rows-[180px]"
        >
          {/* Large Image (takes up 2x2) */}
          <figure className="group relative rounded-[8px] md:col-span-2 md:row-span-2 overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img src={image1} alt="archi" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </figure>
          
          {/* Top Right Wide Image */}
          <figure className="group relative rounded-[8px] md:col-span-2 overflow-hidden shadow-xl border-4 border-slate-800 bg-slate-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img src={image2} alt="coding" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </figure>
          
          {/* Bottom Right Small Images */}
          <figure className="group relative rounded-[8px] md:col-span-1 overflow-hidden shadow-xl border-4 border-slate-800 bg-slate-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img src={image3} alt="games" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </figure>
          
          <figure className="group relative rounded-[8px] md:col-span-1 overflow-hidden shadow-xl border-4 border-slate-800 bg-slate-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img src={image4} alt="welding" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </figure>
        </motion.div>
      </Container>
    </section>
  )
}
