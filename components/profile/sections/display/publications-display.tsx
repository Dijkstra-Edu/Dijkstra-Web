// Publications Display Component

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Users } from "lucide-react";
import type { PublicationsData } from "@/types/client/profile-section/profile-sections";

interface PublicationsDisplayProps {
  data: PublicationsData[];
}

export function PublicationsDisplay({ data }: PublicationsDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No publications added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((publication) => (
        <div key={publication.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="text-lg font-semibold">{publication.title}</h5>
                {publication.publisherLogo && (
                  <img 
                    src={publication.publisherLogo} 
                    alt={`${publication.publisher} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{publication.publisher}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {publication.authors.join(', ')}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(publication.publicationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {publication.description && (
            <p className="text-muted-foreground">{publication.description}</p>
          )}

          {/* Tools */}
          {publication.tools && publication.tools.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Technologies</h6>
              <div className="flex flex-wrap gap-2">
                {publication.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {publication.publicationUrl && (
            <div className="flex flex-wrap gap-4">
              <a
                href={publication.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4" />
                Read Publication
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
