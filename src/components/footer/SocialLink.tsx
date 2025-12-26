import type { IconType } from 'react-icons/lib'

interface SocialLinkProp {
  href: string
  id: string
  Icon: IconType
  bgClass: string
}

function SocialLink({ id, href, Icon, bgClass }: SocialLinkProp) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${bgClass} p-1`}
    >
      <Icon className="w-4 h-4 text-white" />
      <span className="sr-only">{id}</span>
    </a>
  )
}
export default SocialLink
