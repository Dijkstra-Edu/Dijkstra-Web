// Certifications Display Component

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Award } from "lucide-react";
import type { CertificationsData } from "@/types/client/profile-section/profile-sections";
import { TOOLS_OPTIONS } from "@/constants/enum-constants";
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
        <div key={certification.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {certification.issuingOrganizationLogo ? (
                <img
                  src={certification.issuingOrganizationLogo.includes('logo.dev') ? `${certification.issuingOrganizationLogo}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : certification.issuingOrganizationLogo}
                  alt={`${certification.issuingOrganization} logo`}
                  className="w-16 h-16 rounded-lg object-contain border bg-white"
                />
              ) : (
                <img
                  src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${certification.issuingOrganization || 'organization'} company logo`)}`}
                  alt={`${certification.issuingOrganization || 'organization'} logo`}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
              )}
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{certification.name}</h4>
                <p className="text-primary font-medium">{certification.issuingOrganization}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Issued: {new Date(certification.issueDate).toLocaleDateString()}</span>
                  <span>Expires: {certification.expiryDate ? new Date(certification.expiryDate).toLocaleDateString() : "No Expiry"}</span>
                  {certification.expiryDate && new Date(certification.expiryDate) <= new Date() && (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              {certification.credentialId && (
                <p className="text-sm text-muted-foreground mb-1">
                  ID: {certification.credentialId}
                </p>
              )}
              {certification.credentialUrl && (
                <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800 border-gray-600" asChild>
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Tools */}
          {certification.tools && certification.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {certification.tools.map((tool) => {
                const toolOption = TOOLS_OPTIONS.find(option => option.value === tool);
                return (
                  <Badge key={tool} variant="outline">
                    {toolOption?.label || tool}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
