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
  StarIcon,
  GitForkIcon,
  ClockIcon,
  CodeIcon,
  BookmarkIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  XIcon,
  ExternalLinkIcon,
  EyeIcon,
} from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/project-data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const PROJECTS_PER_PAGE = 12;

// Helper functions
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

const getDaysAgo = (dateString: string) => {
  const updateDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - updateDate.getTime());
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
    case "popular":
      return {
        icon: <UsersIcon className="h-4 w-4" />,
        label: "Popular",
        color:
          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      };
    case "good-first-issue":
      return {
        icon: <BarChartIcon className="h-4 w-4" />,
        label: "Good First Issue",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      };
    default:
      return null;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

// Project Card Skeleton Component
function ProjectCardSkeleton() {
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

function AllProjectsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const languages = [...new Set(projects.map((project) => project.language))];
    const categories = [
      ...new Set(projects.map((project) => project.category)),
    ];
    const difficulties = [
      ...new Set(projects.map((project) => project.difficulty)),
    ];
    const licenses = [...new Set(projects.map((project) => project.license))];

    return {
      languages,
      categories,
      difficulties,
      licenses,
    };
  }, []);

  // Initialize state with URL parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState(() => {
    return searchParams.get("language") || "all";
  });
  const [categoryFilter, setCategoryFilter] = useState(() => {
    return searchParams.get("category") || "all";
  });
  const [difficultyFilter, setDifficultyFilter] = useState(() => {
    return searchParams.get("difficulty") || "all";
  });
  const [licenseFilter, setLicenseFilter] = useState(() => {
    return searchParams.get("license") || "all";
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLanguage =
        languageFilter === "all" || project.language === languageFilter;
      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || project.difficulty === difficultyFilter;
      const matchesLicense =
        licenseFilter === "all" || project.license === licenseFilter;

      return (
        matchesSearch &&
        matchesLanguage &&
        matchesCategory &&
        matchesDifficulty &&
        matchesLicense
      );
    });
  }, [
    searchTerm,
    languageFilter,
    categoryFilter,
    difficultyFilter,
    licenseFilter,
  ]);

  // Paginate projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Generate dynamic header based on active filters
  const getPageHeader = () => {
    const activeFilters = [];

    if (languageFilter !== "all") activeFilters.push(languageFilter);
    if (categoryFilter !== "all") activeFilters.push(categoryFilter);
    if (difficultyFilter !== "all") activeFilters.push(difficultyFilter);
    if (licenseFilter !== "all") activeFilters.push(licenseFilter);

    if (activeFilters.length === 0) {
      return {
        title: "All Open Source Projects",
        description: `Showing ${filteredProjects.length} of ${projects.length} projects`,
      };
    }

    // Create a natural language title
    let title = "";
    if (activeFilters.length === 1) {
      title = `${activeFilters[0]} Projects`;
    } else if (activeFilters.length === 2) {
      title = `${activeFilters[0]} ${activeFilters[1]} Projects`;
    } else {
      title = `${activeFilters.slice(0, -1).join(", ")} & ${
        activeFilters[activeFilters.length - 1]
      } Projects`;
    }

    return {
      title,
      description: `Showing ${filteredProjects.length} ${activeFilters
        .join(" ")
        .toLowerCase()} projects`,
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
    setLanguageFilter("all");
    setCategoryFilter("all");
    setDifficultyFilter("all");
    setLicenseFilter("all");
    setCurrentPage(1);

    router.replace(pathname, { scroll: false });

    setIsLoading(false);
  };

  const activeFiltersCount = [
    languageFilter !== "all",
    categoryFilter !== "all",
    difficultyFilter !== "all",
    licenseFilter !== "all",
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
                  placeholder="Search projects, organizations, or topics..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value={languageFilter}
                onValueChange={(value) =>
                  handleFilterChange(setLanguageFilter, value, "language")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {filterOptions.languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
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
                value={difficultyFilter}
                onValueChange={(value) =>
                  handleFilterChange(setDifficultyFilter, value, "difficulty")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {filterOptions.difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={licenseFilter}
                onValueChange={(value) =>
                  handleFilterChange(setLicenseFilter, value, "license")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="License" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  {filterOptions.licenses.map((license) => (
                    <SelectItem key={license} value={license}>
                      {license}
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

      {/* Project Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Show skeleton cards when loading */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedProjects.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or clearing some filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProjects.map((project) => {
                const highlightDetails = project.highlight
                  ? getHighlightDetails(project.highlight)
                  : null;

                return (
                  <Card key={project.id} className="flex h-full flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-md border bg-card">
                          {project.organizationLogo ? (
                            // <Image
                            //   src={
                            //     project.organizationLogo || "/placeholder.svg"
                            //   }
                            //   alt={project.organization}
                            //   width={48}
                            //   height={48}
                            //   className="h-12 w-12 object-contain"
                            // />
                            <img
                                  src={
                                    project.organizationLogo ||
                                    "/placeholder.svg"
                                  }
                                  alt={project.organization}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 object-contain"
                                />
                          ) : (
                            <CodeIcon className="h-6 w-6 text-muted-foreground" />
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
                          {project.title}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-1">
                          <CodeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <CardDescription className="!mt-0">
                            {project.organization}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatNumber(project.stars)} stars
                          </span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {project.language}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <GitForkIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatNumber(project.forks)} forks
                          </span>
                          <Badge
                            variant="outline"
                            className={`ml-auto text-xs ${getDifficultyColor(
                              project.difficulty
                            )}`}
                          >
                            {project.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {project.issuesCount} issues
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Updated {getDaysAgo(project.lastUpdated)}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                          Topics:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.topics.slice(0, 2).map((topic, index) => (
                            <Badge
                              variant="secondary"
                              key={index}
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                          {project.topics.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.topics.length - 2} more
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
                        Star
                      </Button>
                      <Button size="sm" className="w-1/2" asChild>
                        <a
                          href={`https://github.com/${project.repository}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLinkIcon className="mr-1 h-4 w-4" />
                          View Code
                        </a>
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

export default function AllProjectsPage() {
  return (
    <AllProjectsContent />
  );
}
