import logo from '@/assets/images/logo.png'

export default function Logo() {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className=" w-24 md:w-28 h-auto object-cover object-center"
      />
    </figure>
  )
}
