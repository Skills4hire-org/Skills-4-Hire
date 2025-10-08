import Container from "@/components/global/Container";
import PageHeader from "@/components/global/PageHeader";
import { aboutPageData } from "@/utils/database";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Logo from "@/assets/logo.png";

export default function AboutPage() {
  const { title, subtitle, description } = aboutPageData;

  const socials = [
    {
      id: "facebook",
      href: "https://facebook.com/skills4hire",
      Icon: Facebook,
    },
    {
      id: "instagram",
      href: "https://instagram.com/skills4hire",
      Icon: Instagram,
    },
    { id: "twitter", href: "https://twitter.com/skills4hire", Icon: Twitter }, // or X
    {
      id: "linkedin",
      href: "https://linkedin.com/company/skills4hire",
      Icon: Linkedin,
    },
  ];

  return (
    <div className="pb-10">
      <PageHeader title={title} />

      <Container>
        <div className="flex flex-col items-center text-center mt-2 sm:mt-4">
          <img
            src={Logo}
            alt={`${title} Logo`}
            className="w-32 sm:w-40 mb-2 sm:mb-3"
          />

          <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>

          <div className="flex items-center gap-8 mt-4 sm:mt-6 flex-wrap justify-center">
            <a
              href="tel:+2348012345678"
              className="flex flex-col items-center text-gray-600 hover:text-primary transition"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
              <span className="text-xs sm:text-sm font-medium">Call</span>
            </a>
            <a
              href="mailto:info@skills4hire.com"
              className="flex flex-col items-center text-gray-600 hover:text-primary transition"
            >
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
              <span className="text-xs sm:text-sm font-medium">Email</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-sm sm:text-base text-gray-700 text-justify leading-relaxed px-2 sm:px-6 space-y-4">
          {description.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-8">
            {socials.map(({ id, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={id}
                className="text-gray-400 hover:text-primary transition transform hover:-translate-y-0.5"
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
