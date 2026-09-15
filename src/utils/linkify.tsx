import type { ReactNode } from 'react'
import { Fragment } from 'react'

const URL_PATTERN = /(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+)/gi

const stripTrailingPunctuation = (raw: string): { url: string; rest: string } => {
  let url = raw
  let rest = ''
  while (
    url.length > 0 &&
    /[.,;:!?)]"'\]\}']$/.test(url[url.length - 1])
  ) {
    rest = url[url.length - 1] + rest
    url = url.slice(0, -1)
  }
  return { url, rest }
}

export const isLink = (text: string): boolean => /^(https?:\/\/|www\.)/i.test(text)

const toHref = (text: string): string =>
  /^https?:\/\//i.test(text) ? text : `https://${text}`

export function formatLinks(text: string): ReactNode {
  const parts = text.split(URL_PATTERN)

  return parts.map((part, index) => {
    if (!isLink(part)) return <Fragment key={index}>{part}</Fragment>

    const { url, rest } = stripTrailingPunctuation(part)
    if (!url) return <Fragment key={index}>{part}</Fragment>

    return (
      <Fragment key={index}>
        <a
          href={toHref(url)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 break-all hover:text-primary/80"
        >
          {url}
        </a>
        {rest}
      </Fragment>
    )
  })
}