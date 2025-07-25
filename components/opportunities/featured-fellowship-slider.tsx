"use client";

import * as React from "react";
// import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  GraduationCapIcon,
  BookmarkIcon,
  StarIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fellowships } from "@/data/fellowship-data";
import { ScrollArea } from "../ui/scroll-area";
import ProjectDetails from "../project-details";

interface FeaturedFellowshipSliderProps {
  category?: string;
}

const fellowshipConfig = {
  type: "fellowship" as const,
  heroImage: "/hero-meeting.png",
  heroImageAlt: "Fellowship program",
  tabs: {
    overview: true,
    requirements: true,
    readme: true,
  },
}

const FeaturedFellowshipSlider = React.forwardRef<
  CarouselApi,
  FeaturedFellowshipSliderProps
>(({ category = "featured" }, ref) => {
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

  // Filter fellowships based on category
  const filteredFellowships = React.useMemo(() => {
    if (category === "featured") {
      return fellowships.filter((fellowship) => fellowship.featured);
    }
    return fellowships.slice(0, 6);
  }, [category]);

  // Calculate days until deadline
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

  // Get appropriate highlight icon and color
  const getHighlightDetails = (highlight: string | undefined) => {
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
          {filteredFellowships.map((fellowship) => {
            const highlightDetails = fellowship.highlight
              ? getHighlightDetails(fellowship.highlight)
              : null;

            return (
              <CarouselItem
                key={fellowship.id}
                className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/4"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="flex h-full flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="bg-card relative flex h-12 w-12 items-center justify-center rounded-md border">
                            <div className="absolute flex h-full w-full items-center justify-center">
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
                                <GraduationCapIcon className="text-muted-foreground h-6 w-6" />
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
                          <CardTitle>{fellowship.title}</CardTitle>
                          <div className="mt-1 flex items-center gap-1">
                            <GraduationCapIcon className="text-muted-foreground h-3.5 w-3.5" />
                            <CardDescription className="!mt-0">
                              {fellowship.organization}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-grow flex-col gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm">
                              {fellowship.duration}
                            </span>
                            <Badge
                              variant="outline"
                              className="ml-auto text-xs"
                            >
                              {fellowship.locationType.charAt(0).toUpperCase() +
                                fellowship.locationType.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSignIcon className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm">
                              {fellowship.stipend}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm">
                              Deadline:{" "}
                              {getDaysUntilDeadline(
                                fellowship.applicationDeadline
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AwardIcon className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm">
                              Starts:{" "}
                              {new Date(
                                fellowship.startDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mt-2 text-sm">
                          {fellowship.description}
                        </p>

                        <div className="mt-auto">
                          <p className="text-muted-foreground mb-1.5 text-xs font-medium">
                            Benefits:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {fellowship.benefits
                              .slice(0, 3)
                              .map((benefit, index) => (
                                <Badge
                                  variant="secondary"
                                  key={index}
                                  className="text-xs"
                                >
                                  {benefit}
                                </Badge>
                              ))}
                            {fellowship.benefits.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{fellowship.benefits.length - 3} more
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
                      <ProjectDetails item={fellowship} config={fellowshipConfig} />
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
});

FeaturedFellowshipSlider.displayName = "FeaturedFellowshipSlider";

export default FeaturedFellowshipSlider;
