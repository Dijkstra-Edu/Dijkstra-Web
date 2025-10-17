// Work Experience Display Component

import { Badge } from "@/components/ui/badge";
import { calculateExperience, formatMonthYearRange } from "@/lib/profile/profile-utils";
import type { WorkExperienceData } from "@/types/client/profile-section/profile-sections";

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
              <h5 className="text-lg font-semibold">{experience.title}</h5>
              <div className="flex items-center gap-2 mt-1">
                {experience.companyLogo ? (
                  <img 
                    src={experience.companyLogo} 
                    alt={`${experience.companyName} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                ) : null}
                <span className="text-muted-foreground">{experience.companyName}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {formatMonthYearRange(
                  experience.startDateMonth, 
                  experience.startDateYear, 
                  experience.endDateMonth, 
                  experience.endDateYear, 
                  experience.currentlyWorking
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {calculateExperience(
                  `${experience.startDateYear}-${experience.startDateMonth.toString().padStart(2, '0')}-01`,
                  experience.endDateYear && experience.endDateMonth 
                    ? `${experience.endDateYear}-${experience.endDateMonth.toString().padStart(2, '0')}-01`
                    : null,
                  experience.currentlyWorking
                )}
              </p>
            </div>
          </div>

          {/* Description */}
          {experience.descriptionGeneral && (
            <p className="text-muted-foreground">{experience.descriptionGeneral}</p>
          )}

          {/* Skills */}
          {experience.toolsUsed && experience.toolsUsed.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Skills & Technologies</h6>
              <div className="flex flex-wrap gap-2">
                {experience.toolsUsed.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status Badge */}
          {experience.currentlyWorking && (
            <Badge variant="default" className="w-fit">
              Current Position
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
