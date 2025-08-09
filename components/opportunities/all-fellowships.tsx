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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  GraduationCapIcon,
  BookmarkIcon,
  StarIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  XIcon,
  AwardIcon,
} from "lucide-react";
import Image from "next/image";
import { fellowships } from "@/data/fellowship-data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import ProjectDetails from "../project-details";

const FELLOWSHIPS_PER_PAGE = 12;

const fellowshipConfig = {
  type: "fellowship" as const,
  heroImage: "/hero-meeting.png",
  heroImageAlt: "Fellowship program",
  tabs: {
    overview: true,
    requirements: true,
    readme: true,
  },
};

// Helper functions
const formatDuration = (duration: string) => {
  return duration;
};

const getDaysUntilDeadline = (deadlineString: string) => {
  const deadline = new Date(deadlineString);
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Deadline passed";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `${diffDays} days left`;
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

// Fellowship Card Skeleton Component
function FellowshipCardSkeleton() {
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

function AllFellowshipsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const organizations = [
      ...new Set(fellowships.map((fellowship) => fellowship.organization)),
    ];
    const categories = [
      ...new Set(fellowships.map((fellowship) => fellowship.category)),
    ];
    const locationTypes = [
      ...new Set(fellowships.map((fellowship) => fellowship.locationType)),
    ];
    const durations = [
      ...new Set(fellowships.map((fellowship) => fellowship.duration)),
    ];

    return {
      organizations,
      categories,
      locationTypes,
      durations,
    };
  }, []);

  // Initialize state with URL parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState(() => {
    return searchParams.get("organization") || "all";
  });
  const [categoryFilter, setCategoryFilter] = useState(() => {
    return searchParams.get("category") || "all";
  });
  const [locationTypeFilter, setLocationTypeFilter] = useState(() => {
    return searchParams.get("locationType") || "all";
  });
  const [durationFilter, setDurationFilter] = useState(() => {
    return searchParams.get("duration") || "all";
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter fellowships based on search and filters
  const filteredFellowships = useMemo(() => {
    return fellowships.filter((fellowship) => {
      const matchesSearch =
        fellowship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fellowship.organization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        fellowship.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOrganization =
        organizationFilter === "all" ||
        fellowship.organization === organizationFilter;
      const matchesCategory =
        categoryFilter === "all" || fellowship.category === categoryFilter;
      const matchesLocationType =
        locationTypeFilter === "all" ||
        fellowship.locationType === locationTypeFilter;
      const matchesDuration =
        durationFilter === "all" || fellowship.duration === durationFilter;

      return (
        matchesSearch &&
        matchesOrganization &&
        matchesCategory &&
        matchesLocationType &&
        matchesDuration
      );
    });
  }, [
    searchTerm,
    organizationFilter,
    categoryFilter,
    locationTypeFilter,
    durationFilter,
  ]);

  // Paginate fellowships
  const paginatedFellowships = useMemo(() => {
    const startIndex = (currentPage - 1) * FELLOWSHIPS_PER_PAGE;
    return filteredFellowships.slice(
      startIndex,
      startIndex + FELLOWSHIPS_PER_PAGE
    );
  }, [filteredFellowships, currentPage]);

  const totalPages = Math.ceil(
    filteredFellowships.length / FELLOWSHIPS_PER_PAGE
  );

  // Generate dynamic header based on active filters
  const getPageHeader = () => {
    const activeFilters = [];

    if (organizationFilter !== "all") activeFilters.push(organizationFilter);
    if (categoryFilter !== "all") activeFilters.push(categoryFilter);
    if (locationTypeFilter !== "all") activeFilters.push(locationTypeFilter);
    if (durationFilter !== "all") activeFilters.push(durationFilter);

    if (activeFilters.length === 0) {
      return {
        title: "All Fellowship Programs",
        description: `Showing ${filteredFellowships.length} of ${fellowships.length} fellowships`,
      };
    }

    // Create a natural language title
    let title = "";
    if (activeFilters.length === 1) {
      title = `${activeFilters[0]} Fellowships`;
    } else if (activeFilters.length === 2) {
      title = `${activeFilters[0]} ${activeFilters[1]} Fellowships`;
    } else {
      title = `${activeFilters.slice(0, -1).join(", ")} & ${
        activeFilters[activeFilters.length - 1]
      } Fellowships`;
    }

    return {
      title,
      description: `Showing ${filteredFellowships.length} ${activeFilters
        .join(" ")
        .toLowerCase()} fellowships`,
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

    await new Promise((resolve) => setTimeout(resolve, 300));

    filterSetter(value);
    setCurrentPage(1);

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

    await new Promise((resolve) => setTimeout(resolve, 300));

    setSearchTerm("");
    setOrganizationFilter("all");
    setCategoryFilter("all");
    setLocationTypeFilter("all");
    setDurationFilter("all");
    setCurrentPage(1);

    router.replace(pathname, { scroll: false });

    setIsLoading(false);
  };

  const activeFiltersCount = [
    organizationFilter !== "all",
    categoryFilter !== "all",
    locationTypeFilter !== "all",
    durationFilter !== "all",
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
                  placeholder="Search fellowships, organizations, or keywords..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value={organizationFilter}
                onValueChange={(value) =>
                  handleFilterChange(
                    setOrganizationFilter,
                    value,
                    "organization"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {filterOptions.organizations.map((organization) => (
                    <SelectItem key={organization} value={organization}>
                      {organization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={(value) =>
                  handleFilterChange(setCategoryFilter, value, "category")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {filterOptions.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).replace("-", " ")}
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
                  <SelectValue placeholder="Location Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {filterOptions.locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={durationFilter}
                onValueChange={(value) =>
                  handleFilterChange(setDurationFilter, value, "duration")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  {filterOptions.durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
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

      {/* Fellowship Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Show skeleton cards when loading */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: FELLOWSHIPS_PER_PAGE }).map((_, i) => (
              <FellowshipCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedFellowships.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No fellowships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or clearing some filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedFellowships.map((fellowship) => {
                const highlightDetails = fellowship.highlight
                  ? getHighlightDetails(fellowship.highlight)
                  : null;

                return (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        key={fellowship.id}
                        className="flex h-full flex-col"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-md border bg-card">
                              {fellowship.organizationLogo ? (
                                // <Image
                                //   src={
                                //     fellowship.organizationLogo ||
                                //     "/placeholder.svg"
                                //   }
                                //   alt={fellowship.organization}
                                //   width={48}
                                //   height={48}
                                //   className="h-12 w-12 object-contain"
                                // />
                                <img
                                  src={
                                    fellowship.organizationLogo ||
                                    "/placeholder.svg"
                                  }
                                  alt={fellowship.organization}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 object-contain"
                                />
                              ) : (
                                <GraduationCapIcon className="h-6 w-6 text-muted-foreground" />
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
                              {fellowship.title}
                            </CardTitle>
                            <div className="mt-1 flex items-center gap-1">
                              <GraduationCapIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <CardDescription className="!mt-0">
                                {fellowship.organization}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-grow flex-col gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {fellowship.duration}
                              </span>
                              <Badge
                                variant="outline"
                                className="ml-auto text-xs"
                              >
                                {fellowship.locationType
                                  .charAt(0)
                                  .toUpperCase() +
                                  fellowship.locationType.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {fellowship.stipend}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Deadline:{" "}
                                {getDaysUntilDeadline(
                                  fellowship.applicationDeadline
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AwardIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Starts:{" "}
                                {new Date(
                                  fellowship.startDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                            {fellowship.description}
                          </p>

                          <div className="mt-auto">
                            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                              Benefits:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {fellowship.benefits
                                .slice(0, 2)
                                .map((benefit, index) => (
                                  <Badge
                                    variant="secondary"
                                    key={index}
                                    className="text-xs"
                                  >
                                    {benefit}
                                  </Badge>
                                ))}
                              {fellowship.benefits.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{fellowship.benefits.length - 2} more
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
                    </DialogTrigger>
                    {/* <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] p-0 overflow-hidden"> */}
                    <DialogContent className="!max-w-7xl max-h-[85vh] p-0 overflow-hidden">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{fellowship.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[85vh]">
                        <ProjectDetails
                          item={fellowship}
                          config={fellowshipConfig}
                        />
                      </ScrollArea>
                      {/* <ProjectDetails item={job} config={jobConfig} /> */}
                    </DialogContent>
                  </Dialog>
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

export default function AllFellowshipsPage() {
  return <AllFellowshipsContent />;
}
