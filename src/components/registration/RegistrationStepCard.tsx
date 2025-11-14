import { ChevronRight } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Link } from 'react-router-dom'

export default function RegistrationStepCard({
  title,
  desc,
  url,
  handleCheckedState,
}: {
  title: string
  desc: string
  url: string
  handleCheckedState: (title: string) => boolean
}) {
  const checkedState = handleCheckedState(title)
  return (
    <Link to={url} className="block">
      <div className="flex items-center gap-4 justify-between border px-1 py-2 md:px-2 md:py-4 rounded-sm hover:border-primary">
        <div className="flex items-center gap-3">
          <Checkbox
            className="rounded-full h-6 w-6 md:h-7 md:w-7"
            checked={checkedState}
          />
          <div className="space-y-0.5 md:space-y-1">
            <h2 className="text-sm md:text-base capitalize font-medium">
              {title}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-52 md:max-w-full">
              {desc}
            </p>
          </div>
        </div>

        <ChevronRight
          strokeWidth={2.5}
          className="w-6 h-6 md:w-7 md:h-7 bg-primary text-white rounded-full p-0.5"
        />
      </div>
    </Link>
  )
}
