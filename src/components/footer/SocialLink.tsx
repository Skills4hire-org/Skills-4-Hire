import type { IconType } from 'react-icons/lib'

interface SocialLinkProp {
  href: string
  id: string
  Icon: IconType
  bgClass?: string // Keeping for type compatibility, but ignoring
}

function SocialLink({ id, href, Icon }: SocialLinkProp) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-8 h-8 rounded-[4px] border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900"
    >
      <Icon className="w-4 h-4" />
      <span className="sr-only">{id}</span>
    </a>
  )
}
export default SocialLink
