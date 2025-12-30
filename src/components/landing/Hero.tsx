export default function Hero() {
  return (
    <div className="flex flex-col md:gap-4 lg:gap-6 items-center justify-center">
      <div className=" flex flex-col gap-1 md:gap-1 md:flex-row items-center justify-center">
        <p className="text-xs lg:text-sm md:max-w-68 lg:max-w-78 text-center md:text-start">
          Your trusted market place for every skills/service - from local
          services to digital expertise.
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Hire <span className="text-primary">smarter</span>. Work safer
        </p>
      </div>
      <div className="flex flex-col gap-1 md:gap-4 md:flex-row items-center justify-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Get it <span className="text-primary">done</span>.
        </p>
        <p className="text-xs lg:text-sm md:max-w-68 lg:max-w-78 text-center md:text-start">
          Connect with verified professionals, showcase your work and pay
          securely - all in one platform.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <button className="w-32 text-sm py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:shadow-sm cursor-pointer">
          Get Started
        </button>
        <button className="w-32 text-sm py-2 rounded-md text-primary border border-primary cursor-pointer hover:bg-white hover:border-white hover:shadow-sm">
          Contact Us
        </button>
      </div>
      <div className="mt-4 bg-gray-400 h-40 md:h-60 w-full rounded-lg [clip-path:polygon(0%_0%,50%_10%,100%_0%,100%_100%,0_100%)] md:[clip-path:polygon(0%_0%,50%_14%,100%_0%,100%_100%,0_100%)]" />
    </div>
  )
}
