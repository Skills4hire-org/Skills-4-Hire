import logo from '@/assets/images/logo3.png'

export default function Logo3() {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className="h-[30px] md:h-[38px] w-auto"
        width={38}
        height={35}
      />
    </figure>
  )
}
