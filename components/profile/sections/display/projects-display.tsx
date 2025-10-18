// Projects Display Component

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, GitFork, AlertCircle } from "lucide-react";
import type { ProjectsData } from "@/types/client/profile-section/profile-sections";

interface ProjectsDisplayProps {
  data: ProjectsData[];
}

export function ProjectsDisplay({ data }: ProjectsDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No projects added yet
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {project.projectOrganizationLogo ? (
                <img
                  src={project.projectOrganizationLogo.includes('logo.dev') ? `${project.projectOrganizationLogo}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : project.projectOrganizationLogo}
                  alt={`${project.organization} logo`}
                  className="w-16 h-16 rounded-lg object-contain border bg-white"
                />
              ) : project.organization ? (
                <img
                  src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${project.organization} company logo`)}`}
                  alt={`${project.organization} logo`}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">?</span>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{project.name}</h4>
                <p className="text-primary font-medium">{project.organization}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    {project.owner}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.githubStars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.githubForks}
                  </span>
                  {project.githubOpenIssues > 0 && (
                    <span className="flex items-center gap-1 text-orange-500">
                      <AlertCircle className="w-4 h-4" />
                      {project.githubOpenIssues} issues
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {project.domain}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Complexity: {project.complexityRating}/10
              </p>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-muted-foreground">{project.description}</p>
          )}

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          )}

          {/* Project Features */}
          <div className="flex flex-wrap gap-4 text-sm">
            {project.readme && (
              <span className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                README
              </span>
            )}
            {project.license && (
              <span className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                License
              </span>
            )}
            {project.landingPage && (
              <span className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Landing Page
              </span>
            )}
            {project.docsPage && (
              <span className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Documentation
              </span>
            )}
            {project.testingFrameworkPresent && (
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Tests ({project.testingFramework})
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.landingPageLink && (
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800 border-gray-600" asChild>
                <a
                  href={project.landingPageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.docsPageLink && (
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800 border-gray-600" asChild>
                <a
                  href={project.docsPageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Documentation
                </a>
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Lines of Code:</span>
              <p className="font-medium">{project.totalLinesContributed?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Organization:</span>
              <p className="font-medium">{project.organization}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Visibility:</span>
              <p className="font-medium">{project.private ? 'Private' : 'Public'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Upload Status:</span>
              <p className="font-medium">{project.improperUploads ? 'Issues Found' : 'Clean'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}