import { motion } from 'framer-motion'

const logos = [
  "AcmeCorp",
  "GlobalTech",
  "TechFlow",
  "InnovateX",
  "ProBuild",
  "NextGen",
]

export default function LogoTicker() {
  const doubled = [...logos, ...logos, ...logos]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-[600px] mx-auto py-8 md:py-12 overflow-hidden relative"
    >
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Trusted by growing companies
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center w-max animate-ticker-left" style={{ animationDuration: '30s' }}>
          {doubled.map((logo, i) => (
            <div key={i} className="mx-6 md:mx-8 flex items-center justify-center grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
              <span className="text-xl md:text-2xl font-black text-gray-800 tracking-tighter">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
