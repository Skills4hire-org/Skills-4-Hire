import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedCounterProps {
  /** Starting value for the animation */
  from: number
  /** Ending value for the animation */
  to: number
  /** Optional suffix appended after the number (e.g. "+", "%", "k+") */
  suffix?: string
}

/**
 * Animates a number from `from` to `to` when the element enters the viewport.
 * Animation plays only once.
 */
export default function AnimatedCounter({ from, to, suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, count, to])

  return <motion.span ref={ref} className="inline-block">{rounded}</motion.span>
}
