import JobOfferCard from "@/components/home/JobOfferCard";
import { jobOffers } from "@/assets/data";
import { Sliders } from "lucide-react";
import { useMemo, useState } from "react";
import FilterModal from "@/components/home/FilterModal";
import SortDropdown from "@/components/home/SortDropdown";
import NoJobsFound from "@/components/home/NoJobsFound";
import {
  parseBudget,
  extractLocation,
  detectServiceType,
} from "@/utils/jobHelpers";
import { carouselServices } from "@/assets/data";

export default function JobOffers() {
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    serviceType: "",
    minAmount: "",
    maxAmount: "",
    state: "",
    city: "",
  });

  const [sortType, setSortType] = useState("");

  const services = carouselServices.map((service) => service.text);

  const processedJobs = useMemo(() => {
    return jobOffers.map((job) => {
      const { city, state } = extractLocation(job.location);

      return {
        ...job,
        budgetNumber: parseBudget(job.budget),
        city,
        state,
        serviceType: detectServiceType(job.title),
        createdAt: job.id,
      };
    });
  }, []);

  const filteredJobs = useMemo(() => {
    return processedJobs.filter((job) => {
      if (filters.serviceType && job.serviceType !== filters.serviceType)
        return false;

      if (filters.state && job.state !== filters.state) return false;
      if (filters.city && job.city !== filters.city) return false;

      if (filters.minAmount && job.budgetNumber < Number(filters.minAmount))
        return false;

      if (filters.maxAmount && job.budgetNumber > Number(filters.maxAmount))
        return false;

      return true;
    });
  }, [processedJobs, filters]);

  const sortedJobs = useMemo(() => {
    const jobs = [...filteredJobs];

    switch (sortType) {
      case "newest":
        return jobs.sort(
          (newerJob, olderJob) => olderJob.createdAt - newerJob.createdAt,
        );

      case "oldest":
        return jobs.sort(
          (earlierJob, laterJob) => earlierJob.createdAt - laterJob.createdAt,
        );

      case "highest":
        return jobs.sort(
          (higherBudgetJob, lowerBudgetJob) =>
            lowerBudgetJob.budgetNumber - higherBudgetJob.budgetNumber,
        );

      case "lowest":
        return jobs.sort(
          (lowerBudgetJob, higherBudgetJob) =>
            lowerBudgetJob.budgetNumber - higherBudgetJob.budgetNumber,
        );

      default:
        return jobs;
    }
  }, [filteredJobs, sortType]);

  return (
    <div className="lg:px-4">
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        services={services}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-sm md:text-base text-gray-900">
            Recent Job Offers
          </h2>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setFilterOpen(true)}
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-md
                bg-white
                border
                border-gray-200
                text-xs md:text-sm
                shadow-sm
                hover:bg-gray-300
                hover:border-gray-300
                transition
              "
            >
              <Sliders className="w-4 h-4" />
              Filter
            </button>

            <SortDropdown value={sortType} setValue={setSortType} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sortedJobs.length === 0 ? (
            <NoJobsFound />
          ) : (
            sortedJobs.map((offer) => (
              <JobOfferCard key={offer.id} {...offer} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
