import brandLogo from "@/assets/images/AuthLogo.png";

export default function AuthLogo() {
  return (
    <img
      src={brandLogo}
      alt="Brand Logo"
      className="mx-auto object-contain h-12 sm:h-14 md:h-16 w-auto mb-2"
      loading="eager"
    />
  );
}
