import logo from "@/assets/images/logo.png";

export default function Logo() {
  return (
    <figure className="relative overflow-hidden flex justify-center items-center w-20 md:w-24 h-auto">
      <img
        src={logo}
        alt="logo"
        className="scale-[1.3] md:scale-[1.5] object-contain object-center"
      />
    </figure>
  );
}
