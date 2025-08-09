"use client"

import * as React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import {
  StarIcon,
  GitForkIcon,
  ClockIcon,
  CodeIcon,
  BookmarkIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  ExternalLinkIcon,
  EyeIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projects } from "@/data/project-data"
import { ScrollArea } from "../ui/scroll-area"
import ProjectDetails from "../project-details"

interface FeaturedProjectSliderProps {
  category?: string
}

const projectConfig = {
  type: "project" as const,
  heroImage: "/vscode-hero.webp",
  heroImageAlt: "Visual Studio Code interface",
  tabs: {
    overview: true,
    issues: true,
    readme: true,
  },
}

const FeaturedProjectSlider = React.forwardRef<CarouselApi, FeaturedProjectSliderProps>(
  ({ category = "featured" }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>()

    React.useEffect(() => {
      if (api && ref) {
        if (typeof ref === "function") {
          ref(api)
        } else {
          ref.current = api
        }
      }
    }, [api, ref])

    // Filter projects based on category
    const filteredProjects = React.useMemo(() => {
      if (category === "featured") {
        return projects.filter((project) => project.featured)
      }
      return projects.slice(0, 6)
    }, [category])

    // Format numbers for display
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M"
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k"
      }
      return num.toString()
    }

    // Calculate days ago from date
    const getDaysAgo = (dateString: string) => {
      const updateDate = new Date(dateString)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - updateDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      return `${diffDays} days ago`
    }

    // Get appropriate highlight icon and color
    const getHighlightDetails = (highlight: string | undefined) => {
      switch (highlight) {
        case "new":
          return {
            icon: <StarIcon className="h-4 w-4" />,
            label: "New",
            color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          }
        case "trending":
          return {
            icon: <TrendingUpIcon className="h-4 w-4" />,
            label: "Trending",
            color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
          }
        case "popular":
          return {
            icon: <UsersIcon className="h-4 w-4" />,
            label: "Popular",
            color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
          }
        case "good-first-issue":
          return {
            icon: <BarChartIcon className="h-4 w-4" />,
            label: "Good First Issue",
            color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          }
        default:
          return null
      }
    }

    // Get difficulty color
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case "beginner":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "intermediate":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        case "advanced":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      }
    }

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
            {filteredProjects.map((project) => {
              const highlightDetails = project.highlight ? getHighlightDetails(project.highlight) : null

              return (
                <CarouselItem key={project.id} className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/4">
                  <Dialog>
                  <DialogTrigger asChild>
                  <Card className="flex h-full flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="bg-card relative flex h-12 w-12 items-center justify-center rounded-md border">
                          <div className="absolute flex h-full w-full items-center justify-center">
                            {project.organizationLogo ? (
                              // <Image
                              //   src={project.organizationLogo || "/placeholder.svg"}
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
                              <CodeIcon className="text-muted-foreground h-6 w-6" />
                            )}
                          </div>
                        </div>
                        {highlightDetails && (
                          <Badge variant="secondary" className={`flex items-center gap-1 ${highlightDetails.color}`}>
                            {highlightDetails.icon}
                            {highlightDetails.label}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3">
                        <CardTitle>{project.title}</CardTitle>
                        <div className="mt-1 flex items-center gap-1">
                          <CodeIcon className="text-muted-foreground h-3.5 w-3.5" />
                          <CardDescription className="!mt-0">{project.organization}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <StarIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{formatNumber(project.stars)} stars</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {project.language}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <GitForkIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{formatNumber(project.forks)} forks</span>
                          <Badge
                            variant="outline"
                            className={`ml-auto text-xs ${getDifficultyColor(project.difficulty)}`}
                          >
                            {project.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <EyeIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{project.issuesCount} issues</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">Updated {getDaysAgo(project.lastUpdated)}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>

                      <div className="mt-auto">
                        <p className="text-muted-foreground mb-1.5 text-xs font-medium">Topics:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.topics.slice(0, 3).map((topic, index) => (
                            <Badge variant="secondary" key={index} className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {project.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" className="w-1/2 bg-transparent">
                        <BookmarkIcon className="mr-1 h-4 w-4" />
                        Star
                      </Button>
                      <Button size="sm" className="w-1/2" asChild>
                        <a href={`https://github.com/${project.repository}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="mr-1 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>

                  </DialogTrigger>
                  {/* <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] p-0 overflow-hidden"> */}
                  <DialogContent className="!max-w-7xl max-h-[85vh] p-0 overflow-hidden">
                    <DialogHeader className="sr-only">
                      <DialogTitle>{project.title}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[85vh]">
                      <ProjectDetails item={project} config={projectConfig} />
                    </ScrollArea>
                    {/* <ProjectDetails item={job} config={jobConfig} /> */}
                  </DialogContent>
                </Dialog>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    )
  },
)

FeaturedProjectSlider.displayName = "FeaturedProjectSlider"

export default FeaturedProjectSlider
