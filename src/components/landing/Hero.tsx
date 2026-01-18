import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="flex flex-col md:gap-2 items-center justify-center relative">
      <div className=" flex flex-col gap-1 md:gap-3 md:flex-row items-center justify-center max-w-3xl md:-ml-34">
        <p className="text-xs md:max-w-66 text-center md:text-start">
          Your trusted market place for every skills/service - from local
          services to digital expertise.
        </p>
        <p className="text-2xl md:text-3xl font-medium shrink-0">
          Hire <span className="text-primary">smarter</span>. Work safer
        </p>
      </div>
      <div className="flex flex-col gap-1 md:gap-3 md:flex-row items-center justify-center max-w-md md:-mr-42">
        <p className="text-2xl md:text-3xl font-medium shrink-0">
          Get it <span className="text-primary">done</span>.
        </p>
        <p className="text-xs  text-center md:text-start">
          Connect with verified professionals, showcase your work and pay
          securely - all in one platform.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Link
          to="/sign-up"
          className="w-32 text-sm py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:shadow-sm cursor-pointer text-center"
        >
          Create Account
        </Link>
        <Link
          to="/sign-in"
          className="w-32 text-sm py-2 rounded-md text-primary border border-primary cursor-pointer hover:bg-white hover:border-white hover:shadow-sm text-center"
        >
          Sign In
        </Link>
      </div>
      <div className="mt-3 md:mt-0 bg-gray-400 h-48 md:h-72 lg:h-88 w-full rounded-t-lg [clip-path:polygon(0%_0%,50%_10%,100%_0%,100%_100%,0_100%)] md:[clip-path:polygon(0%_0%,50%_16%,100%_0%,100%_100%,0_100%)] lg:[clip-path:polygon(0%_0%,50%_18%,100%_0%,100%_100%, 0_50%)] relative" />
      <div className="absolute -left-0.5 -bottom-0.5  bg-background w-[20%] md:w-[26%] h-6 md:h-10 lg:h-13 rounded-tr-sm" />
      <div className="absolute -right-0.5 -bottom-0.5  bg-background w-[20%] w-[26%] h-6 md:h-10 lg:h-13 rounded-tl-sm" />
    </div>
  )
}
