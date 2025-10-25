// Publications Display Component

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <div key={publication.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {publication.publisherLogo ? (
                <img
                  src={publication.publisherLogo.includes('logo.dev') ? `${publication.publisherLogo}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : publication.publisherLogo}
                  alt={`${publication.publisher} logo`}
                  className="w-16 h-16 rounded-lg object-contain border bg-white"
                />
              ) : publication.publisher ? (
                <img
                  src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${publication.publisher} publisher logo`)}`}
                  alt={`${publication.publisher} logo`}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">?</span>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{publication.title}</h4>
                <p className="text-primary font-medium">{publication.publisher}</p>
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
          </div>

          {/* Description */}
          {publication.description && (
            <p className="text-muted-foreground">{publication.description}</p>
          )}

          {/* Tools */}
          {publication.tools && publication.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {publication.tools.map((tool) => (
                <Badge key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
          )}

          {/* Links */}
          {publication.publicationUrl && (
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800 border-gray-600" asChild>
                <a
                  href={publication.publicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Publication
                </a>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
