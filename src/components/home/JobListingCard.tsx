import { MapPin, Wallet, ExternalLink, Briefcase, Calendar } from 'lucide-react'
import { dateFormatter, currencyFormatter } from '@/utils/format'

export type JobListing = {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary_min: number
  salary_max: number
  job_type: string
  category: string
  website_url: string
  created_at: string
}

export default function JobListingCard({
  title,
  company,
  location,
  description,
  salary_min,
  salary_max,
  job_type,
  category,
  website_url,
  created_at,
}: JobListing) {
  return (
    <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 md:space-y-3 w-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-medium text-gray-500 mb-0.5">
            {company}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">
            {title}
          </h3>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-blue-50 text-blue-700 text-xs whitespace-nowrap">
          <Briefcase className="w-3.5 h-3.5" />
          {job_type}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          {location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          {dateFormatter(created_at)}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600 capitalize">
          {category}
        </span>
      </div>

      <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center gap-1 text-sm">
        <Wallet className="w-4 h-4 text-green-600" />
        <span className="font-semibold text-gray-900">
          {currencyFormatter(salary_min)} - {currencyFormatter(salary_max)}
        </span>
      </div>

      <div className="flex gap-2 pt-1">
        <a
          href={website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md bg-primary text-white text-sm md:text-base hover:bg-primary/90 transition font-medium cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Visit Website</span>
        </a>
        <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:py-2 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition font-medium cursor-pointer">
          <span>View Details</span>
        </button>
      </div>
    </div>
  )
}
