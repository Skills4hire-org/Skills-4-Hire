import logo from '@/assets/images/logo2.png'

export default function Logo2() {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className="w-20 md:w-32"
        width={133}
        height={100}
      />
    </figure>
  )
}
