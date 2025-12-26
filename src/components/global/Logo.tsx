import logo from '@/assets/images/logo.png'

export default function Logo({ size }: { size?: string }) {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className={`  object-cover object-center ${
          size || 'w-24 md:w-28 h-auto'
        }`}
      />
    </figure>
  )
}
