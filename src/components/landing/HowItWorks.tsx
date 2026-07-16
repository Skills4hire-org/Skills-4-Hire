import { useState, useCallback, useEffect } from 'react'
import { howItWorks } from '../../assets/data'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Briefcase, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

// images
import customerImg from '../../assets/images/customer.jpg'
import providerImg from '../../assets/images/provider.jpg'
import platformImg from '../../assets/images/landing-hero.jpg'

const categories = [
  { 
    id: 'customer', 
    title: 'Customers', 
    icon: Users, 
    data: howItWorks.customer,
    image: customerImg 
  },
  { 
    id: 'provider', 
    title: 'Providers', 
    icon: Briefcase, 
    data: howItWorks.provider,
    image: providerImg 
  },
  { 
    id: 'platform', 
    title: 'The Platform', 
    icon: LayoutGrid, 
    data: howItWorks.platform,
    image: platformImg 
  },
]

function StepCarousel({ steps }: { steps: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-none w-[78vw] max-w-[280px] bg-white rounded-[8px] p-4 border border-slate-200 flex flex-col"
            >
              <div className="w-10 h-10 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center font-bold mb-4 text-sm">
                {index + 1}
              </div>
              <h4 className="text-slate-900 font-medium text-sm mb-2">Step {index + 1}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators + nav */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-5 bg-primary' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={scrollNext}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(categories[0].id)

  const activeCategory = categories.find(c => c.id === activeTab)

  return (
    <section id="works" className="py-16 md:py-24 overflow-hidden w-full">
      <div className="w-full">
        
        {/* Content Container */}
        <div className="px-4 md:px-8 lg:px-16">
          
          <div className="text-slate-900 mb-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5 mb-6 self-start mx-auto">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">How it works</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-4">
                How it works
              </h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-[500px] mx-auto">
                Getting started with Skills4Hire is simple. Just follow these easy steps to connect with the right people for your needs.
              </p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 md:mb-12 w-full max-w-full">
            <div className="flex w-full sm:w-auto overflow-x-auto bg-slate-100 p-1 md:p-1.5 rounded-[8px] shadow-sm border border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeTab === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`relative flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-1.5 px-2 py-2 sm:px-3 md:px-6 md:py-2.5 rounded-[8px] text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicatorLight"
                        className="absolute inset-0 bg-white rounded-[8px] shadow-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                      {cat.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch"
              >
                {/* Mobile: Carousel | Desktop: Grid */}
                <div className="lg:w-1/2">
                  {/* Mobile carousel */}
                  <div className="block lg:hidden">
                    <StepCarousel steps={activeCategory.data} />
                  </div>

                  {/* Desktop grid */}
                  <div className="hidden lg:grid grid-cols-2 gap-4 content-start">
                    {activeCategory.data.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white hover:bg-slate-50 rounded-[8px] p-4 border border-slate-200 transition-colors flex flex-col group"
                      >
                        <div className="w-10 h-10 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center font-bold mb-5 group-hover:scale-105 transition-transform">
                          {index + 1}
                        </div>
                        <h4 className="text-slate-900 font-medium text-base mb-2">
                          Step {index + 1}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Large Image */}
                <div className="lg:w-1/2 min-h-[220px] sm:min-h-[300px] lg:min-h-full rounded-[8px] overflow-hidden relative shadow-lg">
                  <motion.img
                    key={activeCategory.image}
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-cover object-center absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
