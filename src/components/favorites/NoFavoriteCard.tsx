import { Heart, Star, ThumbsUp } from 'lucide-react'

export default function NoFavoriteCard({ label }: { label: string }) {
  return (
    <div className="space-y-10 flex flex-col items-center py-20 justify-center md: py-30">
      <div className="flex items-center">
        <div className=" relative w-12 h-12 rounded-full bg-blue-500  before:absolute before:-bottom-3.5 before:-translate-x-1/2 before:left-1/2 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-t-18 before:border-t-blue-500 text-white flex items-center justify-center -rotate-37 translate-x-2 translate-y-3.5 z-40">
          <ThumbsUp className="rotate-37" />
        </div>
        <div className="relative w-12 h-12 rounded-full bg-red-500  before:absolute before:-bottom-3.5 before:-translate-x-1/2 before:left-1/2 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-t-18 before:border-t-red-500 text-white flex items-center justify-center translate-y-2.5 z-50">
          <Heart />
        </div>
        <div className=" relative w-12 h-12 rounded-full bg-yellow-500  before:absolute before:-bottom-3.5 before:-translate-x-1/2 before:left-1/2 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-t-18 before:border-t-yellow-500 text-white flex items-center justify-center rotate-37 -translate-x-2 translate-y-3.5 z-40">
          <Star className="-rotate-37" />
        </div>
      </div>
      <p className="text-sm md:text-base text-muted-foreground">
        No {label} yet
      </p>
    </div>
  )
}
