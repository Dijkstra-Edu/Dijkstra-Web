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
        <div key={education.id} className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {education.schoolLogoUrl ? (
                  <img
                    src={education.schoolLogoUrl.includes('logo.dev') ? `${education.schoolLogoUrl}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : education.schoolLogoUrl}
                    alt={`${education.schoolName} logo`}
                    className="w-16 h-16 rounded-lg object-contain border bg-white"
                  />
                ) : (
                  <img
                    src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${education.schoolName || 'school'} school logo`)}`}
                    alt={`${education.schoolName || 'school'} logo`}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-lg">
                    {education.degree} in {education.courseFieldName}
                  </h4>
                  <p className="text-primary font-medium">{education.schoolName}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>
                      {formatMonthYearRange(
                        education.startDateMonth, 
                        education.startDateYear, 
                        education.endDateMonth, 
                        education.endDateYear, 
                        education.currentlyStudying
                      )}
                    </span>
                    <span>GPA: {education.cgpa}</span>
                    {education.currentlyStudying && <Badge variant="secondary">Current</Badge>}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {education.descriptionGeneral && (
              <p className="text-muted-foreground">{education.descriptionGeneral}</p>
            )}

            {/* Tools Used */}
            {education.toolsUsed && education.toolsUsed.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {education.toolsUsed.map((tool) => (
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
