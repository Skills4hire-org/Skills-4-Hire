import Container from '../global/Container'
import { motion } from 'framer-motion'
import aboutImg from '../../assets/images/about.jpg'
import { Briefcase, Users, ShieldCheck, Headset } from 'lucide-react'
import AnimatedCounter from '../global/AnimatedCounter'

export default function Hero() {
  return (
    <div className="w-full bg-[#F9F9F6] pb-24">
      <Container className="pt-6 md:pt-10">
        
        {/* Top Image Card "About Us" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm"
        >
          <img 
            src={aboutImg} 
            alt="About Us" 
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-[8px] px-4 py-1.5 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Ecosystem for skilled professionals</span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight mb-4">
              About Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl font-light tracking-wide">
              We are Skills4Hire. The operating system for vocational and digital skills, we simplify hiring and getting hired with confidence.
            </p>
          </div>
        </motion.div>

        {/* Principles Section */}
        <div className="mt-16 md:mt-24 max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Our Mission</span>
          </motion.div>

          {/* Headline with Gray/Black text */}
          <div className="max-w-[700px] mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[60px] font-semibold tracking-tighter leading-[1.1] md:leading-[1.0] mb-4 md:mb-6 text-gray-900"
            >
              Making service hiring simple, trusted, <span className="text-primary">and accessible for everyone.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base lg:text-[16px] font-normal text-gray-500 leading-relaxed max-w-[580px] mb-6"
            >
              To make it easy, safe, and rewarding for anyone to hire trusted service providers to showcase their skills, grow their business, and earn more.
            </motion.p>
          </div>

          {/* 4 White Cards with Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-primary/10 rounded-[8px] flex items-center justify-center text-primary mb-8">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                <AnimatedCounter from={0} to={50} suffix="+" />
              </h4>
              <p className="text-sm text-gray-900 font-medium mb-1">Categories</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Information is organized so you always clearly know what services are available.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-primary/10 rounded-[8px] flex items-center justify-center text-primary mb-8">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                <AnimatedCounter from={0} to={2} suffix="k+" />
              </h4>
              <p className="text-sm text-gray-900 font-medium mb-1">Professionals</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                A growing community of verified experts ready to adapt to your specific needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-primary/10 rounded-[8px] flex items-center justify-center text-primary mb-8">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                <AnimatedCounter from={0} to={100} suffix="%" />
              </h4>
              <p className="text-sm text-gray-900 font-medium mb-1">Secure</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Everything works together safely, so you can pay and get paid without friction.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 bg-primary/10 rounded-[8px] flex items-center justify-center text-primary mb-8">
                <Headset className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                <AnimatedCounter from={0} to={24} suffix="/7" />
              </h4>
              <p className="text-sm text-gray-900 font-medium mb-1">Support</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                We are always here to help you move through your hiring journey smoothly.
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </div>
  )
}
