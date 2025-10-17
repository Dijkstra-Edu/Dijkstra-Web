// Volunteering Display Component

import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Heart } from "lucide-react";
import type { VolunteeringData } from "@/types/client/profile-section/profile-sections";

interface VolunteeringDisplayProps {
  data: VolunteeringData[];
}

export function VolunteeringDisplay({ data }: VolunteeringDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No volunteering experience added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((volunteering) => (
        <div key={volunteering.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="text-lg font-semibold">{volunteering.organization}</h5>
                {volunteering.organizationLogo && (
                  <img 
                    src={volunteering.organizationLogo} 
                    alt={`${volunteering.organization} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{volunteering.role}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {volunteering.cause}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(volunteering.startDate).toLocaleDateString()} - {
                    volunteering.endDate 
                      ? new Date(volunteering.endDate).toLocaleDateString()
                      : 'Present'
                  }
                </span>
              </div>
            </div>
            <div className="text-right">
              {volunteering.currentlyVolunteering && (
                <Badge variant="default" className="mb-2">
                  Currently Volunteering
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {volunteering.description && (
            <p className="text-muted-foreground">{volunteering.description}</p>
          )}

          {/* Tools */}
          {volunteering.tools && volunteering.tools.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Technologies Used</h6>
              <div className="flex flex-wrap gap-2">
                {volunteering.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
