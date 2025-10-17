// Certifications Display Component

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Award } from "lucide-react";
import type { CertificationsData } from "@/types/client/profile-section/profile-sections";

interface CertificationsDisplayProps {
  data: CertificationsData[];
}

export function CertificationsDisplay({ data }: CertificationsDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No certifications added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((certification) => (
        <div key={certification.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="text-lg font-semibold">{certification.name}</h5>
                {certification.issuingOrganizationLogo && (
                  <img 
                    src={certification.issuingOrganizationLogo} 
                    alt={`${certification.issuingOrganization} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{certification.issuingOrganization}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {certification.type}
                </span>
                {certification.credentialId && (
                  <span className="flex items-center gap-1">
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {certification.credentialId}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span>Issued: {new Date(certification.issueDate).toLocaleDateString()}</span>
              </div>
              {certification.expiryDate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Expires: {new Date(certification.expiryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tools */}
          {certification.tools && certification.tools.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Technologies</h6>
              <div className="flex flex-wrap gap-2">
                {certification.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {certification.credentialUrl && (
            <div className="flex flex-wrap gap-4">
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4" />
                View Credential
              </a>
            </div>
          )}

          {/* Status Badge */}
          {certification.expiryDate && new Date(certification.expiryDate) > new Date() ? (
            <Badge variant="default" className="w-fit">
              Valid
            </Badge>
          ) : certification.expiryDate ? (
            <Badge variant="destructive" className="w-fit">
              Expired
            </Badge>
          ) : (
            <Badge variant="secondary" className="w-fit">
              No Expiry
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
