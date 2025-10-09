import logo from '@/assets/images/logo2.png'

export default function Logo2() {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className="w-20 md:w-32 mb-2 md:mb-4"
        width={133}
        height={100}
      />
    </figure>
  )
}
