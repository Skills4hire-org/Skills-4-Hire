import { Dot } from 'lucide-react'
import ProfileImage from '../global/ProfileImage'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-y-4 gap-x-10 place-items-center">
      <figure className="w-full h-44 md:h-64 lg:h-74 bg-gray-500 rounded-2xl"></figure>
      <div>
        <span className="capitalize text-sm lg:text-base block mb-3 ">
          articles
        </span>
        <Link to="/blog/id">
          <h2 className="mb-2 text-2xl lg:text-3xl font-medium hover:text-primary">
            The Future of Local Hiring: Trust, Skills & Technology
          </h2>
        </Link>
        <p className="text-xs lg:text-sm mb-6">
          How digital tools are reshaping how customers hire and how
          professionals grow.
        </p>
        <div className="flex items-center gap-3">
          <ProfileImage noStatus size="size-11 md:size" />
          <div>
            <h3 className="text-sm lg:text-base font-medium">
              Michelle Owolabi
            </h3>
            <div className="flex items-center text-xs lg:text-sm -mt-1 text-muted-foreground">
              <span>January 14, 2025</span> <Dot className="-mx-1" />
              <span>4 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
