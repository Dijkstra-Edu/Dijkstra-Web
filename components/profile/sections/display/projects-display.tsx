// Projects Display Component

import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-6">
      {data.map((project) => (
        <div key={project.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="text-lg font-semibold">{project.name}</h5>
                {project.organizationLogo && (
                  <img 
                    src={project.organizationLogo} 
                    alt={`${project.organization} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{project.githubAbout}</p>
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
            <div>
              <h6 className="text-sm font-medium mb-2">Topics</h6>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Technologies</h6>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
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
              <a
                href={project.landingPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.docsPageLink && (
              <a
                href={project.docsPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4" />
                Documentation
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Lines of Code:</span>
              <p className="font-medium">{project.totalLinesContributed.toLocaleString()}</p>
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
