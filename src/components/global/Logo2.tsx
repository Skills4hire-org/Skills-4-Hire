import logo from "@/assets/images/logo2.png";

export default function Logo() {
  return (
    <figure className="relative overflow-hidden flex justify-center items-center w-16 md:w-20 lg:w-24 h-auto">
      <img
        src={logo}
        alt="logo"
        className="scale-[1.3] md:scale-[1.5] object-contain object-center"
      />
    </figure>
  );
}
