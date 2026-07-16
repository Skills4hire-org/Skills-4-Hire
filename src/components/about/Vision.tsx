import { motion } from 'framer-motion'
import Container from '../global/Container'
import helping from '../../assets/images/vision.jpg'

export default function Vision() {
  return (
    <div className="py-20 md:py-32 relative overflow-hidden">

      <Container className="relative z-10">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
          
          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-start space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mx-auto md:mx-0">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Our Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] font-semibold tracking-tighter leading-[1.1] md:leading-[1.0] text-gray-900 mx-auto md:mx-0 max-w-[450px]">
              Empowering the future of <span className="text-primary">work.</span>
            </h2>
            <p className="text-sm md:text-base lg:text-[16px] font-normal text-gray-500 mx-auto md:mx-0 leading-relaxed max-w-lg">
              To create a world where services are easily accessible and
              trustworthy, enriching the lives of individuals and communities.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
            <figure className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={helping}
                alt="helping"
                className="object-cover object-center w-full h-full transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
            </figure>
          </motion.div>

        </div>
      </Container>
    </div>
  )
}
