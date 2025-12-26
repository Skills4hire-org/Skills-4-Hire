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
    <div>
      <h2 className="font-semibold text-sm capitalize text-background">
        {heading}
      </h2>
      <ul>
        {links.map(({ label, url }) => {
          return (
            <li key={label} className="py-0.5">
              <Link
                to={url}
                className="hover:text-white hover:underline text-sm text-muted-foreground"
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FooterLink
