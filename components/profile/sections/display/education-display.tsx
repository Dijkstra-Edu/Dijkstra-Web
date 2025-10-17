// Education Display Component

import { Badge } from "@/components/ui/badge";
import { formatMonthYearRange } from "@/lib/profile/profile-utils";
import type { EducationData } from "@/types/client/profile-section/profile-sections";

interface EducationDisplayProps {
  data: EducationData[];
}

export function EducationDisplay({ data }: EducationDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No education information added yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((education) => (
        <div key={education.id} className="border rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h5 className="text-lg font-semibold">{education.schoolName}</h5>
              <div className="flex items-center gap-2 mt-1">
                {education.schoolLogoUrl ? (
                  <img 
                    src={education.schoolLogoUrl} 
                    alt={`${education.schoolName} logo`}
                    className="w-6 h-6 rounded object-contain"
                  />
                ) : null}
                <span className="text-muted-foreground">{education.degree} in {education.courseFieldName}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {formatMonthYearRange(
                  education.startDateMonth, 
                  education.startDateYear, 
                  education.endDateMonth, 
                  education.endDateYear, 
                  education.currentlyStudying
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {education.location.city}, {education.location.country}
              </p>
            </div>
          </div>

          {/* Description */}
          {education.descriptionGeneral && (
            <p className="text-muted-foreground">{education.descriptionGeneral}</p>
          )}

          {/* CGPA */}
          {education.cgpa && (
            <div>
              <h6 className="text-sm font-medium mb-2">CGPA</h6>
              <Badge variant="secondary" className="text-sm">
                {education.cgpa}/4.0
              </Badge>
            </div>
          )}

          {/* Tools Used */}
          {education.toolsUsed && education.toolsUsed.length > 0 && (
            <div>
              <h6 className="text-sm font-medium mb-2">Technologies & Tools</h6>
              <div className="flex flex-wrap gap-2">
                {education.toolsUsed.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status Badge */}
          {education.currentlyStudying && (
            <Badge variant="default" className="w-fit">
              Currently Studying
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
