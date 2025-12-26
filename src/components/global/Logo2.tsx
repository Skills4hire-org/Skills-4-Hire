import logo from '@/assets/images/logo2.png'

export default function Logo({ size }: { size?: string }) {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className={` object-cover object-center ${
          size || 'w-26 md:w-36 h-auto'
        }`}
      />
    </figure>
  )
}
