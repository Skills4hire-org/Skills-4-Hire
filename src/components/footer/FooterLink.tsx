import { Link } from 'react-router-dom'

interface FooterLinkProp {
  heading: string
  links: {
    label: string
    url: string
  }[]
}

function FooterLink({ heading, links }: FooterLinkProp) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-sm capitalize text-white">
        {heading}
      </h2>
      <ul className="space-y-1.5">
        {links.map(({ label, url }) => {
          return (
            <li key={label}>
              {label.includes('Contact') || label.includes('@') || label.includes('+') ? (
                <a
                  href={url}
                  className="hover:text-white transition-colors text-sm text-white/70"
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={url}
                  className="hover:text-white transition-colors text-sm text-white/70"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FooterLink
