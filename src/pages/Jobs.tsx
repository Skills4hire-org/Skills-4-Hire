import { Briefcase, Search, Sliders, X } from "lucide-react";
import { useMemo, useState } from "react";
import NoJobsFound from "@/components/global/NoResultFound";
import JobListingCard from "@/components/home/JobListingCard";
import { useJobApplications } from "@/hooks/usePosts";
import Loading from "@/components/global/Loading";
import ErrorComponent from "@/components/global/Error";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { JobListing } from "@/components/home/JobListingCard";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useJobApplications();

  const allJobs: JobListing[] =
    data?.pages.flatMap((page) => page.results) ?? [];

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleRetry = () => {
    if (!data) {
      refetch();
    } else {
      fetchNextPage();
    }
  };

  const categories = useMemo(() => {
    const cats = new Set(
      allJobs
        .map((job) => job.category?.name)
        .filter((category): category is string => Boolean(category))
    );
    return ["All", ...Array.from(cats)];
  }, [allJobs]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company_name.toLowerCase().includes(q) ||
        (job.location && job.location.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "All" || job.category?.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allJobs, searchQuery, selectedCategory]);

  return (
    <div className="lg:px-4">
      <div className="space-y-2">
        <div className="bg-white space-y-4 py-2 px-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold ml-2 lg:ml-0 md:ml-0 text-sm md:text-base text-gray-900">
              Job Listings
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`inline-flex items-center gap-2 h-[36px] px-4 border text-xs md:text-sm shadow-sm transition cursor-pointer ${
                filterOpen || selectedCategory !== "All"
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="flex flex-wrap gap-2 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-1">
          {isLoading ? (
            <div className="py-10">
              <Loading />
            </div>
          ) : isError ? (
            <div className="py-10">
              <ErrorComponent text="Failed to load jobs" buttonFunc={handleRetry} />
            </div>
          ) : filteredJobs.length === 0 ? (
            <NoJobsFound
              icon={Briefcase}
              text="No jobs found"
              subtitle="Try adjusting your search or filters"
            />
          ) : (
            filteredJobs.map((job) => (
              <JobListingCard key={job.application_id} {...job} />
            ))
          )}
        </div>

        <div ref={loadMoreRef} />

        {isFetchingNextPage && (
          <div className="py-4">
            <Loading />
          </div>
        )}
        {hasNextPage && !isLoading && (
          <button
            className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
            onClick={() => fetchNextPage()}
          >
            Load more
          </button>
        )}
        {isFetchNextPageError && (
          <ErrorComponent
            text="Failed to load more jobs"
            buttonFunc={fetchNextPage}
            buttonText="Retry"
          />
        )}
      </div>
    </div>
  );
}
