import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Wrench,
  Zap,
  Sparkles,
  Laptop,
  Paintbrush,
  Hammer,
  Hexagon,
  Circle,
  Square,
  Triangle,
  type LucideIcon,
} from 'lucide-react'

const professionals: {
  id: number
  role: string
  icon: LucideIcon
  message: string
  x: number
  y: number
}[] = [
  { id: 1, role: 'Plumber', icon: Wrench, message: 'Need a plumber?', x: -380, y: -120 },
  { id: 2, role: 'Electrician', icon: Zap, message: 'Expert Electrician', x: 380, y: -160 },
  { id: 3, role: 'Cleaner', icon: Sparkles, message: 'House Cleaning', x: -350, y: 150 },
  { id: 4, role: 'Web Dev', icon: Laptop, message: 'Need a Website?', x: 360, y: 140 },
  { id: 5, role: 'Painter', icon: Paintbrush, message: 'Professional Painter', x: -180, y: -260 },
  { id: 6, role: 'Carpenter', icon: Hammer, message: 'Woodwork Pro', x: 220, y: 280 },
]

function Word({
  word,
  scrollYProgress,
  index,
  total,
}: {
  word: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}) {
  const start = (index / total) * 0.6
  const end = start + 0.1

  const color = useTransform(scrollYProgress, [start, end], ['#d1d5db', '#111827'])

  return (
    <motion.span
      style={{ color }}
      className="mr-2 md:mr-3 lg:mr-4 mb-2"
    >
      {word}
    </motion.span>
  )
}

function FloatingProfessionalCard({
  prof,
  scrollYProgress,
  index,
}: {
  prof: (typeof professionals)[number]
  scrollYProgress: MotionValue<number>
  index: number
}) {
  const start = 0.4 + index * 0.08
  const end = start + 0.1

  const scale = useTransform(scrollYProgress, [start, end], [0, 1])
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const yOffset = useTransform(scrollYProgress, [start, end], [30, 0])

  const Icon = prof.icon

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `translate(calc(-50% + ${prof.x}px), calc(-50% + ${prof.y}px))`,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: yOffset,
        }}
        className="flex items-center gap-3 bg-white shadow-xl rounded-full p-2 pr-5 border border-gray-100"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="whitespace-nowrap">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{prof.role}</div>
          <div className="text-[13px] font-bold text-gray-900">{prof.message}</div>
        </div>
      </motion.div>
    </div>
  )
}

export default function InteractiveScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const mainText =
    'Connecting skilled professionals and clients seamlessly, while simplifying booking, tracking and payment for both parties'
  const words = mainText.split(' ')

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full" id="interactive-skills">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pointer-events-none">
        {/* Trusted By Top Section */}
        <div className="absolute top-12 md:top-24 w-full flex flex-col items-center gap-6 opacity-60">
          <p className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-gray-500">
            Trusted by companies across industries
          </p>
          <div className="flex gap-8 md:gap-16 items-center justify-center flex-wrap px-4">
            <span className="font-bold text-xl flex items-center gap-2 text-gray-400"><Hexagon className="w-5 h-5 fill-current" /> Logoipsum</span>
            <span className="font-bold text-xl flex items-center gap-2 text-gray-400"><Circle className="w-5 h-5 fill-current" /> Logoipsum</span>
            <span className="font-bold text-xl flex items-center gap-2 text-gray-400"><Square className="w-5 h-5 fill-current" /> Logoipsum</span>
            <span className="font-bold text-xl flex items-center gap-2 text-gray-400 hidden md:flex"><Triangle className="w-5 h-5 fill-current" /> Logoipsum</span>
          </div>
        </div>

        {/* Main Text with Word-by-Word Scroll Reveal */}
        <div className="z-10 text-center pointer-events-auto px-4 max-w-5xl mx-auto">
          <h2 className="flex flex-wrap justify-center text-3xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight leading-tight md:leading-[1.15]">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                scrollYProgress={scrollYProgress}
                index={i}
                total={words.length}
              />
            ))}
          </h2>
        </div>

        {/* Floating Professionals popping up driven by scroll progress */}
        <div className="absolute top-1/2 left-1/2 w-full h-full pointer-events-auto">
          {professionals.map((prof, index) => (
            <FloatingProfessionalCard
              key={prof.id}
              prof={prof}
              scrollYProgress={scrollYProgress}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}