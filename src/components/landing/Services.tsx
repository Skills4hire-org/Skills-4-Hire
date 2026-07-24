import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import webDevelopment from '../../assets/images/webDevelopment.jpg'
import projectManagement from '../../assets/images/projectManagement.jpg'
import fitnessTraining from '../../assets/images/fitnessTraining.jpg'
import dataAnalysis from '../../assets/images/dataAnalysis.jpg'
import hairDressing from '../../assets/images/hairDressing.jpg'
import graphicDesign from '../../assets/images/graphicDesign.jpg'
import digitalMarketing from '../../assets/images/digitalMarketing.jpg'
import cybersecurity from '../../assets/images/cybersecurity.jpg'
import carpentry from '../../assets/images/carpentry.jpg'
import motionGraphics from '../../assets/images/motionGraphics.jpg'
import electrical from '../../assets/images/electrical.jpg'
import devops from '../../assets/images/devops.jpg'
import plumbing from '../../assets/images/plumbing.jpg'
import videoEditing from '../../assets/images/videoEditing.jpg'
import cleaning from '../../assets/images/cleaning.jpg'

const row1 = [
  { image: electrical,       label: 'Electrical' },
  { image: plumbing,         label: 'Plumbing' },
  { image: carpentry,        label: 'Carpentry' },
  { image: webDevelopment,   label: 'Web Development' },
  { image: graphicDesign,    label: 'Graphic Design' },
  { image: digitalMarketing, label: 'Digital Marketing' },
  { image: dataAnalysis,     label: 'Data Analysis' },
  { image: cybersecurity,    label: 'Cybersecurity' },
]

const row2 = [
  { image: fitnessTraining,  label: 'Fitness Training' },
  { image: hairDressing,     label: 'Hairdressing' },
  { image: motionGraphics,   label: 'Motion Graphics' },
  { image: projectManagement,label: 'Project Management' },
  { image: devops,           label: 'DevOps' },
  { image: videoEditing,     label: 'Video Editing' },
  { image: cleaning,         label: 'Cleaning' },
  { image: plumbing,         label: 'Plumbing' },
]

function TickerCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="relative flex-shrink-0 w-[160px] h-[210px] md:w-[200px] md:h-[260px] rounded-2xl overflow-hidden shadow-md group mx-1.5 md:mx-[6px]">
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* label */}
      <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex justify-center px-2">
        <span className="bg-white/60 backdrop-blur-md border border-white/60 text-gray-900 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-center truncate">
          {label}
        </span>
      </div>
    </div>
  )
}

function Ticker({ items, direction = 'left' }: { items: typeof row1; direction?: 'left' | 'right' }) {
  const doubled = [...items, ...items]
  const animClass = direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'

  return (
    <div className="relative w-full overflow-hidden">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />

      <div className={`flex ${animClass}`} style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <TickerCard key={i} image={item.image} label={item.label} />
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24 overflow-hidden bg-[#0f172a]">

      {/* ── Header ── */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 mb-10 md:mb-14 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-medium text-white leading-[1.1] tracking-tight mb-5">
            Skilled Professionals<br />
            <span className="text-primary">Ready for hire</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-[500px] mb-8">
            From trusted home repairs and vocational trades to cutting-edge digital solutions,
            Skills4Hire connects you with the right expert in seconds.
          </p>
          <Link
            to="/sign-in"
            className="group flex items-center justify-center gap-2 w-full md:w-max px-6 py-2.5 md:py-3 text-sm font-medium rounded-[4px] bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" size={16} />
          </Link>
        </motion.div>
      </div>

      {/* ── Tickers ── */}
      <div className="flex flex-col gap-4">
        <Ticker items={row1} direction="left" />
        <Ticker items={row2} direction="right" />
      </div>

    </section>
  )
}
