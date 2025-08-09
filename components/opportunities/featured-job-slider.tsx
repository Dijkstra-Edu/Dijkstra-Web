"use client";

import * as React from "react";
// import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  DollarSignIcon,
  StarIcon,
  BookmarkIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react";
import { jobPositions } from "@/data/job-data";
import ProjectDetails from "../project-details";
import { ScrollArea } from "../ui/scroll-area";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  companyName: string;
  companyLogo: string;
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior" | "lead" | "executive";
  postedDate: string;
  salary: string;
  description: string;
  featured: boolean;
  highlight: "new" | "trending" | "competitive" | "popular" | undefined;
  perks: string[];
  category: string;
}

interface FeaturedJobSliderProps {
  category: string;
}

const jobConfig = {
  type: "job" as const,
  heroImage: "/hero-outdoor.jpeg",
  heroImageAlt: "Job opportunity",
  tabs: {
    overview: true,
    readme: true,
  },
};

const FeaturedJobSlider = React.forwardRef<CarouselApi, FeaturedJobSliderProps>(
  ({ category }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
      if (api && ref) {
        if (typeof ref === "function") {
          ref(api);
        } else {
          ref.current = api;
        }
      }
    }, [api, ref]);

    // Filter jobs based on category
    const filteredJobs = React.useMemo(() => {
      switch (category) {
        case "featured":
          return jobPositions.filter((job) => job.featured);
        case "engineering":
          return jobPositions.filter((job) =>
            job.department.toLowerCase().includes("engineering")
          );
        case "remote":
          return jobPositions.filter((job) => job.locationType === "remote");
        default:
          return jobPositions.slice(0, 6);
      }
    }, [category]);

    // Calculate days ago from date
    const getDaysAgo = (dateString: string) => {
      const postDate = new Date(dateString);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - postDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "Yesterday";
      } else {
        return `${diffDays} days ago`;
      }
    };

    // Format location type for display
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

    // Format employment type for display
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

    // Get appropriate highlight icon and color
    const getHighlightDetails = (highlight: JobPosition["highlight"]) => {
      switch (highlight) {
        case "new":
          return {
            icon: <StarIcon className="h-4 w-4" />,
            label: "New",
            color:
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
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

    return (
      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredJobs.map((job) => {
              const highlightDetails = job.highlight
                ? getHighlightDetails(job.highlight)
                : null;

              return (
                <CarouselItem
                  key={job.id}
                  className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/4"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="flex h-full flex-col">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="bg-card relative flex h-12 w-12 items-center justify-center rounded-md border">
                              <div className="absolute flex h-full w-full items-center justify-center">
                                {job.organizationLogo ? (
                                  // <Image
                                  //   src={
                                  //     job.organizationLogo || "/placeholder.svg"
                                  //   }
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
                                  <BuildingIcon className="text-muted-foreground h-6 w-6" />
                                )}
                              </div>
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
                            <CardTitle>{job.title}</CardTitle>
                            <div className="mt-1 flex items-center gap-1">
                              <BuildingIcon className="text-muted-foreground h-3.5 w-3.5" />
                              <CardDescription className="!mt-0">
                                {job.companyName}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-grow flex-col gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="text-muted-foreground h-4 w-4" />
                              <span className="text-sm">{job.location}</span>
                              <Badge
                                variant="outline"
                                className="ml-auto text-xs"
                              >
                                {formatLocationType(job.locationType)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <BriefcaseIcon className="text-muted-foreground h-4 w-4" />
                              <span className="text-sm">{job.department}</span>
                              <Badge
                                variant="outline"
                                className="ml-auto text-xs"
                              >
                                {formatEmploymentType(job.employmentType)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSignIcon className="text-muted-foreground h-4 w-4" />
                              <span className="text-sm">{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="text-muted-foreground h-4 w-4" />
                              <span className="text-sm">
                                Posted {getDaysAgo(job.postedDate)}
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mt-2 text-sm">
                            {job.description}
                          </p>

                          <div className="mt-auto">
                            <p className="text-muted-foreground mb-1.5 text-xs font-medium">
                              Perks & Benefits:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {job.perks.slice(0, 3).map((perk, index) => (
                                <Badge
                                  variant="secondary"
                                  key={index}
                                  className="text-xs"
                                >
                                  {perk}
                                </Badge>
                              ))}
                              {job.perks.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.perks.length - 3} more
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
                        <DialogTitle>{job.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[85vh]">
                        <ProjectDetails item={job} config={jobConfig} />
                      </ScrollArea>
                      {/* <ProjectDetails item={job} config={jobConfig} /> */}
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
);

FeaturedJobSlider.displayName = "FeaturedJobSlider";

export default FeaturedJobSlider;
