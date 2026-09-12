import { MapPin, Clock, Building2, ExternalLink, Wallet, X } from "lucide-react";
import { useState } from "react";

export type JobListing = {
  application_id: string;
  title: string;
  description: string;
  location?: string;
  is_remote?: boolean;
  job_type?: string;
  company_name: string;
  job_link?: string;
  min_charge?: string;
  max_charge?: string;
  category?: {
    category_id: string;
    name: string;
    description?: string;
  };
  created_at: string;
};

export default function JobListingCard({
  application_id,
  title,
  description,
  location,
  is_remote,
  job_type,
  company_name,
  job_link,
  min_charge,
  max_charge,
  category,
  created_at,
}: JobListing) {
  const [viewMore, setViewMore] = useState(false);

  const formatSalary = (min?: string, max?: string) => {
    const minNum = min ? parseFloat(min) : null;
    const maxNum = max ? parseFloat(max) : null;
    if (minNum && maxNum) return `₦${minNum.toLocaleString()} - ₦${maxNum.toLocaleString()}`;
    if (minNum) return `₦${minNum.toLocaleString()}+`;
    if (maxNum) return `Up to ₦${maxNum.toLocaleString()}`;
    return null;
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const salary = formatSalary(min_charge, max_charge);
  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <>
      <div className="bg-white lg:rounded-lg shadow p-3 md:p-4 space-y-3 w-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1">
              {company_name}
            </p>
            {location && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
          {formatTimeAgo(created_at)}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-0.5">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
        {job_type && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-blue-50 text-blue-700 whitespace-nowrap capitalize">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {job_type}
          </span>
        )}
        {category && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-purple-50 text-purple-700 whitespace-nowrap">
            {category.name}
          </span>
        )}
        {is_remote && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-green-50 text-green-700 whitespace-nowrap">
            Remote
          </span>
        )}
        {salary && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-yellow-50 text-yellow-800 whitespace-nowrap">
            <Wallet className="w-3.5 h-3.5 shrink-0" />
            {salary}
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setViewMore(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          <span>View Description</span>
        </button>

        {job_link ? (
          <a
            href={job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium rounded-md bg-primary text-white hover:opacity-90 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Apply
          </a>
        ) : (
          <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium rounded-md bg-primary/20 text-primary/60 cursor-not-allowed">
            <ExternalLink className="w-3.5 h-3.5" />
            Apply
          </span>
        )}
      </div>
      </div>

      {viewMore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`job-title-${application_id}`}
          onClick={() => setViewMore(false)}
        >
          <div
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-white p-5 shadow-xl md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">{company_name}</p>
                <h2 id={`job-title-${application_id}`} className="mt-1 text-xl font-bold text-gray-900">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewMore(false)}
                aria-label="Close job details"
                className="shrink-0 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
              {location && <span className="rounded-sm bg-green-50 px-2 py-1.5 text-green-700">{location}</span>}
              {is_remote && <span className="rounded-sm bg-green-50 px-2 py-1.5 text-green-700">Remote</span>}
              {job_type && <span className="rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700">{job_type}</span>}
              {category && <span className="rounded-sm bg-purple-50 px-2 py-1.5 text-purple-700">{category.name}</span>}
              {salary && <span className="rounded-sm bg-yellow-50 px-2 py-1.5 text-yellow-800">{salary}</span>}
            </div>

            <div className="mt-5 space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Job description</h3>
                <p className="mt-1 whitespace-pre-wrap">{description}</p>
              </div>
              <p>Posted {formattedDate}</p>
            </div>

            {job_link ? (
              <a
                href={job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" />
                Apply
              </a>
            ) : (
              <span className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary/20 px-3 py-2 text-sm font-medium text-primary/60">
                <ExternalLink className="h-4 w-4" />
                Apply unavailable
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}