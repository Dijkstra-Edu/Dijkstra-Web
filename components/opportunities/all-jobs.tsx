"use client";
import { Suspense } from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  CalendarIcon,
  BuildingIcon,
  BookmarkIcon,
  StarIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
// import Image from "next/image";
import { jobPositions } from "@/data/job-data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const JOBS_PER_PAGE = 12;

// Helper functions moved outside component
const formatLocationType = (type: string) => {
  switch (type) {
    case "remote":
      return "Remote";
    case "hybrid":
      return "Hybrid";
    case "onsite":
      return "On-site";
    default:
      return type;
  }
};

const formatEmploymentType = (type: string) => {
  switch (type) {
    case "full-time":
      return "Full-time";
    case "part-time":
      return "Part-time";
    case "contract":
      return "Contract";
    case "internship":
      return "Internship";
    default:
      return type;
  }
};

const getDaysAgo = (dateString: string) => {
  const postDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const getHighlightDetails = (highlight: string | undefined) => {
  switch (highlight) {
    case "new":
      return {
        icon: <StarIcon className="h-4 w-4" />,
        label: "New",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      };
    case "trending":
      return {
        icon: <TrendingUpIcon className="h-4 w-4" />,
        label: "Trending",
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      };
    case "competitive":
      return {
        icon: <BarChartIcon className="h-4 w-4" />,
        label: "Competitive",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      };
    case "popular":
      return {
        icon: <UsersIcon className="h-4 w-4" />,
        label: "Popular",
        color:
          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      };
    default:
      return null;
  }
};

// Job Card Skeleton Component
function JobCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Skeleton className="h-12 w-12 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-3">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-2 h-16 w-full" />
        <div className="mt-auto space-y-2">
          <Skeleton className="h-3 w-24" />
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 pt-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/2" />
      </CardFooter>
    </Card>
  );
}

function AllJobsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const locations = [...new Set(jobPositions.map((job) => job.location))];
    const departments = [...new Set(jobPositions.map((job) => job.department))];
    const locationTypes = [
      ...new Set(jobPositions.map((job) => job.locationType)),
    ];
    const employmentTypes = [
      ...new Set(jobPositions.map((job) => job.employmentType)),
    ];
    const experienceLevels = [
      ...new Set(jobPositions.map((job) => job.experienceLevel)),
    ];

    return {
      locations,
      departments,
      locationTypes,
      employmentTypes,
      experienceLevels,
    };
  }, []);

  // Initialize state with URL parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState(() => {
    return searchParams.get("location") || "all";
  });
  const [departmentFilter, setDepartmentFilter] = useState(() => {
    return searchParams.get("department") || "all";
  });
  const [locationTypeFilter, setLocationTypeFilter] = useState(() => {
    return searchParams.get("locationType") || "all";
  });
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState(() => {
    return searchParams.get("employmentType") || "all";
  });
  const [experienceLevelFilter, setExperienceLevelFilter] = useState(() => {
    return searchParams.get("experienceLevel") || "all";
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobPositions.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "all" || job.location === locationFilter;
      const matchesDepartment =
        departmentFilter === "all" || job.department === departmentFilter;
      const matchesLocationType =
        locationTypeFilter === "all" || job.locationType === locationTypeFilter;
      const matchesEmploymentType =
        employmentTypeFilter === "all" ||
        job.employmentType === employmentTypeFilter;
      const matchesExperienceLevel =
        experienceLevelFilter === "all" ||
        job.experienceLevel === experienceLevelFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesDepartment &&
        matchesLocationType &&
        matchesEmploymentType &&
        matchesExperienceLevel
      );
    });
  }, [
    searchTerm,
    locationFilter,
    departmentFilter,
    locationTypeFilter,
    employmentTypeFilter,
    experienceLevelFilter,
  ]);

  // Paginate jobs
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  // Generate dynamic header based on active filters
  const getPageHeader = () => {
    const activeFilters = [];

    if (locationFilter !== "all") activeFilters.push(locationFilter);
    if (departmentFilter !== "all") activeFilters.push(departmentFilter);
    if (locationTypeFilter !== "all") {
      const formatted = formatLocationType(locationTypeFilter);
      activeFilters.push(formatted);
    }
    if (employmentTypeFilter !== "all") {
      const formatted = formatEmploymentType(employmentTypeFilter);
      activeFilters.push(formatted);
    }
    if (experienceLevelFilter !== "all") {
      const formatted =
        experienceLevelFilter.charAt(0).toUpperCase() +
        experienceLevelFilter.slice(1);
      activeFilters.push(`${formatted} Level`);
    }

    if (activeFilters.length === 0) {
      return {
        title: "All Job Positions",
        description: `Showing ${filteredJobs.length} of ${jobPositions.length} positions`,
      };
    }

    // Create a natural language title
    let title = "";
    if (activeFilters.length === 1) {
      title = `${activeFilters[0]} Jobs`;
    } else if (activeFilters.length === 2) {
      title = `${activeFilters[0]} ${activeFilters[1]} Jobs`;
    } else {
      title = `${activeFilters.slice(0, -1).join(", ")} & ${
        activeFilters[activeFilters.length - 1]
      } Jobs`;
    }

    return {
      title,
      description: `Showing ${filteredJobs.length} ${activeFilters
        .join(" ")
        .toLowerCase()} positions`,
    };
  };

  const pageHeader = getPageHeader();

  // Reset page when filters change and update URL
  const handleFilterChange = async (
    filterSetter: (value: string) => void,
    value: string,
    paramName: string
  ) => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    filterSetter(value);
    setCurrentPage(1);

    // Update URL
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      newParams.delete(paramName);
    } else {
      newParams.set(paramName, value);
    }

    const newUrl = newParams.toString()
      ? `${pathname}?${newParams.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });

    setIsLoading(false);
  };

  // Clear all filters
  const clearFilters = async () => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSearchTerm("");
    setLocationFilter("all");
    setDepartmentFilter("all");
    setLocationTypeFilter("all");
    setEmploymentTypeFilter("all");
    setExperienceLevelFilter("all");
    setCurrentPage(1);

    // Clear URL parameters
    router.replace(pathname, { scroll: false });

    setIsLoading(false);
  };

  const activeFiltersCount = [
    locationFilter !== "all",
    departmentFilter !== "all",
    locationTypeFilter !== "all",
    employmentTypeFilter !== "all",
    experienceLevelFilter !== "all",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">{pageHeader.title}</h1>
            <p className="text-muted-foreground">{pageHeader.description}</p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value={locationFilter}
                onValueChange={(value) =>
                  handleFilterChange(setLocationFilter, value, "location")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {filterOptions.locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={departmentFilter}
                onValueChange={(value) =>
                  handleFilterChange(setDepartmentFilter, value, "department")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {filterOptions.departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={locationTypeFilter}
                onValueChange={(value) =>
                  handleFilterChange(
                    setLocationTypeFilter,
                    value,
                    "locationType"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Work Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {filterOptions.locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatLocationType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={employmentTypeFilter}
                onValueChange={(value) =>
                  handleFilterChange(
                    setEmploymentTypeFilter,
                    value,
                    "employmentType"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Employment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employment</SelectItem>
                  {filterOptions.employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatEmploymentType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={experienceLevelFilter}
                onValueChange={(value) =>
                  handleFilterChange(
                    setExperienceLevelFilter,
                    value,
                    "experienceLevel"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {filterOptions.experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="gap-2 bg-transparent"
                >
                  <XIcon className="h-4 w-4" />
                  Clear Filters ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Show skeleton cards when loading */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: JOBS_PER_PAGE }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedJobs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or clearing some filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedJobs.map((job) => {
                const highlightDetails = job.highlight
                  ? getHighlightDetails(job.highlight)
                  : null;

                return (
                  <Card key={job.id} className="flex h-full flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-md border bg-card">
                          {job.organizationLogo ? (
                            // <Image
                            //   src={job.companyLogo || "/placeholder.svg"}
                            //   alt={job.companyName}
                            //   width={48}
                            //   height={48}
                            //   className="h-12 w-12 object-contain"
                            // />
                            <img
                                  src={
                                    job.organizationLogo ||
                                    "/placeholder.svg"
                                  }
                                  alt={job.organization}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 object-contain"
                                />
                          ) : (
                            <BuildingIcon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        {highlightDetails && (
                          <Badge
                            variant="secondary"
                            className={`flex items-center gap-1 ${highlightDetails.color}`}
                          >
                            {highlightDetails.icon}
                            {highlightDetails.label}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3">
                        <CardTitle className="line-clamp-2">
                          {job.title}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-1">
                          <BuildingIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <CardDescription className="!mt-0">
                            {job.companyName}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.location}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {formatLocationType(job.locationType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.department}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {formatEmploymentType(job.employmentType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Posted {getDaysAgo(job.postedDate)}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {job.description}
                      </p>

                      <div className="mt-auto">
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                          Perks & Benefits:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.perks.slice(0, 2).map((perk, index) => (
                            <Badge
                              variant="secondary"
                              key={index}
                              className="text-xs"
                            >
                              {perk}
                            </Badge>
                          ))}
                          {job.perks.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.perks.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-1/2 bg-transparent"
                      >
                        <BookmarkIcon className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                      <Button size="sm" className="w-1/2">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AllJobsPage() {
  return (
    <AllJobsContent />
  );
}
