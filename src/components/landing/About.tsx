import { motion } from 'framer-motion'
import aboutImg from '../../assets/images/about.jpg'
import electricalImg from '../../assets/images/electrical.jpg'
import plumbingImg from '../../assets/images/plumbing.jpg'
import AnimatedCounter from '../global/AnimatedCounter'

export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-[#F9F9F6] overflow-hidden mt-8 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 md:gap-16 items-center lg:items-stretch">
        
        {/* Left: Copy */}
        <div className="flex flex-col gap-5 md:gap-6 z-10 relative items-start">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">About Skills4Hire</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-[40px] font-medium text-gray-900 leading-[1.3] md:leading-[1.2] tracking-tight"
          >
            We are a trusted platform built to connect people who need services with the skilled professionals who can deliver them.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-sm md:text-lg lg:text-xl leading-relaxed max-w-lg"
          >
            From vocational experts to digital freelancers, we bring every skill into one accessible ecosystem. We simplify hiring and getting hired with confidence.
          </motion.p>

          {/* Animated Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-6 pt-6 md:pt-8 border-t border-gray-200 w-full"
          >
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                <AnimatedCounter from={0} to={50} suffix="+" />
              </h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Skill Categories</p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                <AnimatedCounter from={0} to={2} suffix="k+" />
              </h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Professionals</p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                <AnimatedCounter from={0} to={100} suffix="%" />
              </h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Secure Payments</p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                <AnimatedCounter from={0} to={24} suffix="/7" />
              </h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Support</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Bento Floating Cards */}
        <div className="relative w-full self-stretch flex items-stretch justify-center pl-0 mt-8 lg:mt-0">
          
          {/* Main Center: Bento Image Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[90%] lg:w-[85%] z-10 grid grid-cols-2 gap-[8px] min-h-[300px] md:min-h-0 md:[grid-template-rows:1fr_180px] [grid-template-rows:1fr_140px]"
          >
            {/* Image 1: Top Full Width */}
            <div className="col-span-2 rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[4px] border-[#3b82f6] relative bg-gray-100">
              <img src={aboutImg} alt="Professional" className="w-full h-full object-cover object-center" />
            </div>
            {/* Image 2: Bottom Left */}
            <div className="rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative bg-gray-100 border-[4px] border-[#3b82f6]">
              <img src={electricalImg} alt="Electrician" className="w-full h-full object-cover object-center" />
            </div>
            {/* Image 3: Bottom Right */}
            <div className="rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative bg-gray-100 border-[4px] border-[#3b82f6]">
              <img src={plumbingImg} alt="Plumber" className="w-full h-full object-cover object-center" />
            </div>
          </motion.div>

          {/* Floating Card 1: Top Left */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[-5%] md:top-[12%] left-[-5%] md:left-[2%] scale-[0.85] md:scale-100 origin-top-left bg-white/60 backdrop-blur-md border border-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-4 w-[240px] z-30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-semibold text-gray-900 text-sm">Instant Matching</h4>
                <p className="text-[10px] text-gray-600 font-medium">Find Pros Fast</p>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-white/50 mb-3" />
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Request:</span>
                <span className="text-xs font-semibold text-gray-900">Electrician</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Status:</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded tracking-wide">3 PROS FOUND</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2: Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[20%] md:bottom-[200px] right-[-5%] md:right-[2%] scale-[0.85] md:scale-100 origin-bottom-right bg-white/60 backdrop-blur-md border border-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-4 w-[240px] z-30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-semibold text-gray-900 text-sm">Verified Pros</h4>
                <p className="text-[10px] text-gray-600 font-medium">Background Checked</p>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-white/50 mb-3" />
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Alex J.</span>
                <span className="text-[10px] text-gray-500 font-medium ml-auto">120+ Jobs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span className="text-xs font-semibold text-gray-900">5.0 Rating</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
