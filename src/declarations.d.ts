declare module 'swiper/css'
declare module 'swiper/css/pagination'
declare module 'swiper/css/navigation'

import type Lenis from 'lenis'

declare global {
  interface Window {
    lenis?: Lenis
  }
}
