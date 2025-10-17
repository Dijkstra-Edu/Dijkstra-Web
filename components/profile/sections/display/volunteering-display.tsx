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
        <div key={volunteering.id} className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {volunteering.organizationLogo ? (
                  <img
                    src={volunteering.organizationLogo.includes('logo.dev') ? `${volunteering.organizationLogo}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : volunteering.organizationLogo}
                    alt={`${volunteering.organization} logo`}
                    className="w-16 h-16 rounded-lg object-contain border bg-white"
                  />
                ) : (
                  <img
                    src={`/abstract-geometric-shapes.png?key=flpqa&height=48&width=48&query=${encodeURIComponent(`${volunteering.organization || 'organization'} organization logo`)}`}
                    alt={`${volunteering.organization || 'organization'} logo`}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-lg">{volunteering.role}</h4>
                  <p className="text-primary font-medium">{volunteering.organization}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>
                      {new Date(volunteering.startDate).toLocaleDateString()} - {
                        volunteering.endDate 
                          ? new Date(volunteering.endDate).toLocaleDateString()
                          : 'Present'
                      }
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {volunteering.cause}
                    </span>
                    {volunteering.currentlyVolunteering && <Badge variant="secondary">Ongoing</Badge>}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {volunteering.description && (
              <p className="text-muted-foreground">{volunteering.description}</p>
            )}

            {/* Tools */}
            {volunteering.tools && volunteering.tools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {volunteering.tools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
