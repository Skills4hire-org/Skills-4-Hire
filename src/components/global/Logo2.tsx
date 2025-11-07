import logo from '@/assets/images/logo2.png'

export default function Logo() {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className="w-26 md:w-36 h-auto object-cover object-center"
      />
    </figure>
  )
}
