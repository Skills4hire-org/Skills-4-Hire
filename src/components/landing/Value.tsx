import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import customer from '../../assets/images/customer.jpg'
import provider from '../../assets/images/provider.jpg'
import { motion } from 'framer-motion'

export default function Value() {
  return (
    <section id="value" className="w-full overflow-hidden pt-6 md:pt-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">What we offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-medium text-gray-900 leading-[1.1] tracking-tight mb-3 md:mb-4">
            What we <span className="text-primary">Offer</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[400px]">
            Whether you’re a customer or a provider, Skills4Hire is designed to fit
            your needs perfectly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 md:mt-0"
        >
          <Link
            to="/sign-up"
            className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 text-sm font-medium rounded-[4px] bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        
        {/* Customer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[8px] overflow-hidden border border-gray-200 flex flex-col group"
        >
          <div className="p-4 md:p-5 flex flex-col flex-1">
            <div className="w-10 h-10 bg-primary/40 text-primary rounded-[8px] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              For Customers
            </h3>
            <p className="text-[15px] md:text-base text-gray-600 leading-[1.7] mb-8 pr-4">
              Easily browse services, post job requests, compare offers,
              and hire providers with secure payments all from
              your personalized customer dashboard.
            </p>
            <div className="mt-auto">
              <Link to="/sign-up" className="group inline-flex w-max items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-[4px] border border-primary/20 bg-transparent text-primary hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                Join as Customer
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="w-full h-56 md:h-72 px-4 pb-4 md:px-5 md:pb-5">
            <div className="w-full h-full rounded-[4px] overflow-hidden relative transform transition-transform duration-700 group-hover:-translate-y-1">
              <img
                src={customer}
                alt="customer dashboard"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Provider Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[8px] overflow-hidden border border-gray-200 flex flex-col group"
        >
          <div className="p-4 md:p-5 flex flex-col flex-1">
            <div className="w-10 h-10 bg-primary/40 text-primary rounded-[8px] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="M12 2v2"/></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              For Providers
            </h3>
            <p className="text-[15px] md:text-base text-gray-600 leading-[1.7] mb-8 pr-4">
              Showcase your work, receive job offers, manage your
              services, and grow your earnings with powerful tools in the
              provider dashboard.
            </p>
            <div className="mt-auto">
              <Link to="/sign-up" className="group inline-flex w-max items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-[4px] border border-primary/20 bg-transparent text-primary hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                Join as Provider
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="w-full h-56 md:h-72 px-4 pb-4 md:px-5 md:pb-5">
            <div className="w-full h-full rounded-[4px] overflow-hidden relative transform transition-transform duration-700 group-hover:-translate-y-1">
              <img
                src={provider}
                alt="provider dashboard"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
