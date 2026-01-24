import logo from '@/assets/images/logo3.png'

export default function Logo3({ size }: { size?: string }) {
  return (
    <figure>
      <img
        src={logo}
        alt="logo"
        className={`w-auto ${size || 'h-[30px] md:h-[38px]'}`}
        width={38}
        height={35}
      />
    </figure>
  )
}
