import { Badge } from '../ui/badge'

export default function SectionHeading({ title }: { title: string }) {
  return (
    <Badge className="rounded-r-full rounded-l-none py-1.5 text-sm font-normal px-4">
      {title}
    </Badge>
  )
}
