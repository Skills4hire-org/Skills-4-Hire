import { MapPin, Clock, Building2, ExternalLink, Wallet } from "lucide-react";
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

  return (
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
        <p
          className={`text-xs md:text-sm text-gray-600 ${
            !viewMore && "line-clamp-2 sm:line-clamp-none"
          }`}
        >
          {description}
        </p>
        {description.length > 100 && (
          <button
            onClick={() => setViewMore(!viewMore)}
            className="text-xs text-primary underline cursor-pointer hover:no-underline sm:hidden"
          >
            {viewMore ? "less" : "more"}
          </button>
        )}
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

      {job_link && (
        <a
          href={job_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm text-primary font-medium hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Job
        </a>
      )}
    </div>
  );
}