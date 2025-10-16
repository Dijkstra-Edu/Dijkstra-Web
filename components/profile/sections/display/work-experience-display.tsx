// Work Experience Display Component

import { Badge } from "@/components/ui/badge";
import { calculateExperience, formatDateRange } from "@/lib/profile/profile-utils";
import type { WorkExperienceData } from "@/types/profile-sections";

interface WorkExperienceDisplayProps {
  data: WorkExperienceData[];
}

export function WorkExperienceDisplay({ data }: WorkExperienceDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No work experience added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h5 className="text-lg font-semibold">{experience.position}</h5>
              <div className="flex items-center gap-2 mt-1">
                {experience.company?.logo_url ? (
                  <img 
                    src={experience.company.logo_url} 
                    alt={`${experience.company.name} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                ) : null}
                <span className="text-muted-foreground">{experience.company?.name || 'No company specified'}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {formatDateRange(experience.startDate, experience.endDate, experience.current)}
              </p>
              <p className="text-xs text-muted-foreground">
                {calculateExperience(experience.startDate, experience.endDate, experience.current)}
              </p>
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <p className="text-muted-foreground">{experience.description}</p>
          )}

          {/* Skills */}
          {experience.skills && experience.skills.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Skills & Technologies</h6>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status Badge */}
          {experience.current && (
            <Badge variant="default" className="w-fit">
              Current Position
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
