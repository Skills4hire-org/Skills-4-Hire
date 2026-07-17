import { useState } from 'react'
import { features } from '@/assets/data'
import Container from '../global/Container'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <section id="features" className="w-full py-16 md:py-24 bg-[#0f172a]">
      <Container>
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]">
              Why Choose <br className="hidden md:block" />
              Skills4Hire?
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {features.map(({ title, desc, icon }, index) => {
              const isLast = index === features.length - 1
              const isActive = hoveredIndex !== null ? hoveredIndex === index : isLast

              return (
                <motion.div 
                  variants={itemVariants} 
                  key={title} 
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex flex-col p-8 md:p-10 rounded-[8px] min-h-[320px] md:min-h-[380px] transition-colors duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white text-slate-900 border border-slate-200/60 shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center mb-auto transition-colors duration-300 ${
                    isActive 
                      ? 'bg-white text-primary' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    <Icon icon={icon} width={20} height={20} />
                  </div>
                  
                  <div>
                    <h3 className={`font-medium text-lg md:text-xl mb-1 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}>
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-white/90' : 'text-slate-500'
                    }`}>
                      {desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Footer Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 md:pt-10"
          >
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Skills4Hire connects trusted providers with customers every day, 
              making work safer and hiring smarter. Our expert team is here to 
              assist you every step of the way.
            </p>
            
            <Link
              to="/sign-up"
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 text-sm font-medium rounded-[4px] bg-primary text-white hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0"
            >
              Create Account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}

export default Features
