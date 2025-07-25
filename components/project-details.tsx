"use client";

import type React from "react";

import Image from "next/image";
import {
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  Star,
  GitFork,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type DetailItem,
  type Fellowship,
  type Project,
  type JobPosition,
  type DetailPageConfig,
  isFellowship,
  isProject,
  isJobPosition,
} from "../types";

interface DetailPageProps {
  item: DetailItem;
  config: DetailPageConfig;
  heroImage?: string;
  triggerButton?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ProjectDetails({
  item,
  config,
  heroImage,
  triggerButton,
  open,
  onOpenChange,
}: DetailPageProps) {
  const defaultHeroImage = item.heroImage;
  const project = item as Project; // Declare project variable

  const renderSidebarContent = () => {
    if (isFellowship(item)) {
      return renderFellowshipSidebar(item);
    } else if (isProject(item)) {
      return renderProjectSidebar(item);
    } else if (isJobPosition(item)) {
      return renderJobSidebar(item);
    }
    return null;
  };

  const renderFellowshipSidebar = (fellowship: Fellowship) => (
    <>
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          ORGANIZATION
        </h3>
        <p className="text-lg font-medium">{fellowship.organization}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          LOCATION
        </h3>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <p className="text-lg font-medium">{fellowship.location}</p>
          <Badge variant="outline" className="text-xs">
            {fellowship.locationType}
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          DURATION
        </h3>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <p className="text-lg font-medium">{fellowship.duration}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          STIPEND
        </h3>
        <p className="text-lg font-medium text-green-600">
          {fellowship.stipend}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          DEADLINE
        </h3>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {new Date(fellowship.applicationDeadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          TECHNOLOGIES
        </h3>
        <div className="flex flex-wrap gap-2">
          {fellowship.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
          {fellowship.technologies.length > 4 && (
            <Badge
              variant="outline"
              className="border-border text-muted-foreground"
            >
              +{fellowship.technologies.length - 4} more
            </Badge>
          )}
        </div>
      </div>
    </>
  );

  const renderProjectSidebar = (project: Project) => (
    <>
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          MAINTAINER
        </h3>
        <p className="text-lg font-medium">{project.organization}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          LANGUAGE
        </h3>
        <p className="text-lg font-medium">{project.language}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          STARS
        </h3>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <p className="text-lg font-medium">
            {project.stars.toLocaleString()} stars
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          FORKS
        </h3>
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-muted-foreground" />
          <p className="text-lg font-medium">
            {project.forks.toLocaleString()} forks
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          ISSUES
        </h3>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
          <p className="text-lg font-medium">{project.issuesCount} issues</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          DIFFICULTY
        </h3>
        <Badge
          variant="outline"
          className={`${
            project.difficulty === "beginner"
              ? "border-green-500 text-green-400"
              : project.difficulty === "intermediate"
              ? "border-yellow-500 text-yellow-400"
              : "border-red-500 text-red-400"
          }`}
        >
          {project.difficulty}
        </Badge>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          LAST UPDATED
        </h3>
        <p className="text-sm text-muted-foreground">
          Updated {new Date(project.lastUpdated).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          TOPICS
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 4).map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="border-border text-muted-foreground"
            >
              {topic}
            </Badge>
          ))}
          {project.topics.length > 4 && (
            <Badge
              variant="outline"
              className="border-border text-muted-foreground"
            >
              +{project.topics.length - 4} more
            </Badge>
          )}
        </div>
      </div>
    </>
  );

  const renderJobSidebar = (job: JobPosition) => (
    <>
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          COMPANY
        </h3>
        <p className="text-lg font-medium">{job.companyName}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          DEPARTMENT
        </h3>
        <p className="text-lg font-medium">{job.department}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          LOCATION
        </h3>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <p className="text-lg font-medium">{job.location}</p>
          <Badge variant="outline" className="text-xs">
            {job.locationType}
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          EMPLOYMENT TYPE
        </h3>
        <Badge variant="outline" className="border-blue-500 text-blue-400">
          {job.employmentType}
        </Badge>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          EXPERIENCE LEVEL
        </h3>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          {job.experienceLevel}
        </Badge>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          SALARY
        </h3>
        <p className="text-lg font-medium text-green-600">{job.salary}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          POSTED
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(job.postedDate).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          PERKS
        </h3>
        <div className="flex flex-wrap gap-2">
          {job.perks.slice(0, 3).map((perk) => (
            <Badge
              key={perk}
              variant="outline"
              className="border-border text-muted-foreground"
            >
              {perk}
            </Badge>
          ))}
          {job.perks.length > 3 && (
            <Badge
              variant="outline"
              className="border-border text-muted-foreground"
            >
              +{job.perks.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </>
  );

  const getActionButtonText = () => {
    if (isFellowship(item)) return "Apply Now";
    if (isProject(item)) return "View on GitHub";
    if (isJobPosition(item)) return "Apply for Position";
    return "Learn More";
  };

  const getHighlightText = () => {
    if (item.highlight === "new") return "New";
    if (item.highlight === "trending") return "Trending";
    if (item.highlight === "competitive") return "Competitive";
    if (item.highlight === "popular") return "Popular";
    if (item.highlight === "good-first-issue") return "Good First Issue";
    return "Featured";
  };

  const renderTabContent = () => {
    const tabs = [];

    // Overview tab (always present)
    tabs.push(
      <TabsTrigger
        key="overview"
        value="overview"
        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary data-[state=active]:hover:text-primary-foreground text-muted-foreground hover:text-foreground transition-colors"
      >
        Overview
      </TabsTrigger>
    );

    // Conditional tabs based on item type
    if (isProject(item) && config.tabs.issues) {
      tabs.push(
        <TabsTrigger
          key="issues"
          value="issues"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary data-[state=active]:hover:text-primary-foreground text-muted-foreground hover:text-foreground transition-colors"
        >
          Open Issues
        </TabsTrigger>
      );
    }

    if (isFellowship(item) && config.tabs.requirements) {
      tabs.push(
        <TabsTrigger
          key="requirements"
          value="requirements"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary data-[state=active]:hover:text-primary-foreground text-muted-foreground hover:text-foreground transition-colors"
        >
          Requirements
        </TabsTrigger>
      );
    }

    if (config.tabs.readme) {
      tabs.push(
        <TabsTrigger
          key="readme"
          value="readme"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary data-[state=active]:hover:text-primary-foreground text-muted-foreground hover:text-foreground transition-colors"
        >
          {isProject(item) ? "Readme" : "Details"}
        </TabsTrigger>
      );
    }

    return tabs;
  };

  const content = (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="p-4 md:p-6">
        <div className="relative h-[250px] overflow-hidden rounded-2xl">
          {/* <Image
            src={defaultHeroImage || "/placeholder.svg"}
            alt={config.heroImageAlt}
            fill
            className="object-cover"
            priority
          /> */}
          <img
            src={defaultHeroImage || "/placeholder.svg"}
            alt={config.heroImageAlt}
            className="object-cover w-full h-full"
            loading="eager"
          />

          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-white/80 mb-2">
                {getHighlightText()}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-white/30 overflow-hidden p-1">
                  {/* <Image
                    src={item.organizationLogo || "/placeholder.svg"}
                    alt={`${item.organization} Logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  /> */}
                  <img
                    src={item.organizationLogo || "/placeholder.svg"}
                    alt={`${item.organization} Logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {item.title}
                </h1>
              </div>
              <p className="text-lg text-white/90 mb-6 max-w-3xl">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {item.category}
                </Badge>
                {isFellowship(item) && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {item.locationType}
                  </Badge>
                )}
                {isProject(item) && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {item.language}
                  </Badge>
                )}
                {isJobPosition(item) && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {item.employmentType}
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  +2 more
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-72 p-4 md:p-6 border-r border-border">
          <div className="space-y-6">
            {renderSidebarContent()}

            <Button
              variant="outline"
              className="w-full justify-between border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              {getActionButtonText()}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <Tabs defaultValue="overview" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList
                  className={`grid max-w-lg bg-muted border border-border`}
                  style={{
                    gridTemplateColumns: `repeat(${
                      renderTabContent().length
                    }, 1fr)`,
                  }}
                >
                  {renderTabContent()}
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-8 mt-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isFellowship(item)
                      ? "Fellowship Overview"
                      : isProject(item)
                      ? "Project Overview"
                      : "Position Overview"}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {isFellowship(item) && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                    <ul className="text-muted-foreground leading-relaxed space-y-2">
                      {item.benefits.map((benefit) => (
                        <li key={benefit}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isProject(item) && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="text-muted-foreground leading-relaxed space-y-2">
                      <li>
                        • {project.stars.toLocaleString()} stars on GitHub
                      </li>
                      <li>
                        • {project.forks.toLocaleString()} forks from the
                        community
                      </li>
                      <li>• {project.contributorsCount} active contributors</li>
                      <li>• Licensed under {project.license}</li>
                      <li>• Written primarily in {project.language}</li>
                    </ul>
                  </div>
                )}

                {isJobPosition(item) && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                    <ul className="text-muted-foreground leading-relaxed space-y-2">
                      {item.perks.map((perk) => (
                        <li key={perk}>• {perk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              {isProject(item) && config.tabs.issues && (
                <TabsContent value="issues" className="space-y-6 mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Open Issues</h2>
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4 hover:border-accent transition-colors bg-card">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-card-foreground">
                            Performance issues with large datasets
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-red-500 text-red-400"
                          >
                            High Priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          Application becomes slow when processing datasets
                          larger than 10MB
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Opened 2 days ago</span>
                          <span>•</span>
                          <span>15 comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {isFellowship(item) && config.tabs.requirements && (
                <TabsContent value="requirements" className="space-y-6 mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                    <ul className="text-muted-foreground leading-relaxed space-y-2">
                      {item.requirements.map((requirement) => (
                        <li key={requirement}>• {requirement}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}

              {config.tabs.readme && (
                <TabsContent value="readme" className="space-y-6 mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      {isProject(item) ? "README.md" : "Additional Details"}
                    </h2>
                    <div className="bg-muted border border-border rounded-lg p-6 font-mono text-sm">
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-xl font-bold text-foreground mb-2">
                            # {item.title}
                          </h1>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>

                        {isProject(item) && (
                          <>
                            <div>
                              <h2 className="text-lg font-semibold text-foreground mb-2">
                                ## Installation
                              </h2>
                              <div className="bg-background rounded p-3 text-chart-1">
                                <p>git clone {item.repository}</p>
                                <p>cd {item.title.toLowerCase()}</p>
                                <p>npm install</p>
                              </div>
                            </div>

                            <div>
                              <h2 className="text-lg font-semibold text-foreground mb-2">
                                ## License
                              </h2>
                              <p className="text-muted-foreground">
                                {item.license} License - see LICENSE file for
                                details.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );

  if (triggerButton) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{item.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[85vh]">{content}</ScrollArea>
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
            onClick={() => onOpenChange?.(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
}
