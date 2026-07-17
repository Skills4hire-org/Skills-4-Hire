import { carouselServices } from '@/assets/data'

// Split services into two rows for the two ticker tracks
const row1 = carouselServices.slice(0, Math.ceil(carouselServices.length / 2))
const row2 = carouselServices.slice(Math.ceil(carouselServices.length / 2))

function TickerRow({
  items,
  direction,
}: {
  items: typeof carouselServices
  direction: 'left' | 'right'
}) {
  // Duplicate for seamless infinite loop
  const doubled = [...items, ...items]

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks on left & right edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#f9fafb] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#f9fafb] to-transparent" />

      <div
        className={`flex gap-3 w-max ${
          direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'
        }`}
      >
        {doubled.map(({ image, text }, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl shrink-0 w-[160px] h-[110px] shadow-sm group border border-border"
          >
            <img
              src={image}
              alt={text}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            
            <div className="absolute top-2 left-2 max-w-[calc(100%-16px)]">
              <span className="inline-block bg-white/95 backdrop-blur-md text-foreground text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-sm truncate max-w-full">
                {text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ServiceTicker() {
  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <TickerRow items={row1} direction="left" />
      <TickerRow items={row2} direction="right" />
    </div>
  )
}
