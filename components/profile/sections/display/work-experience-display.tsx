// Work Experience Display Component

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateExperience, formatMonthYearRange, sortByEndDate } from "@/lib/profile/profile-utils";
import { EMPLOYMENT_TYPE_OPTIONS, WORK_LOCATION_TYPE_OPTIONS, DOMAIN_OPTIONS } from "@/constants/enum-constants";
import type { WorkExperienceData } from "@/types/client/profile-section/profile-sections";

interface WorkExperienceDisplayProps {
  data: WorkExperienceData[];
}

// Helper functions to get display labels
const getEmploymentTypeLabel = (value: string) => {
  return EMPLOYMENT_TYPE_OPTIONS.find(option => option.value === value)?.label || value;
};

const getLocationTypeLabel = (value: string) => {
  return WORK_LOCATION_TYPE_OPTIONS.find(option => option.value === value)?.label || value;
};

const getDomainLabel = (value: string) => {
  return DOMAIN_OPTIONS.find(option => option.value === value)?.label || value;
};

export function WorkExperienceDisplay({ data }: WorkExperienceDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No work experience added yet
      </div>
    );
  }

  // Sort work experience from most recent to least recent
  const sortedData = sortByEndDate(data);

  return (
    <div className="space-y-6">
      {sortedData.map((experience) => (
        <div key={experience.id} className="relative border-l-2 border-muted pl-6 pb-6 last:pb-0">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1.5" />
          
          <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start gap-4">
              {experience.companyLogo ? (
                <img
                  src={experience.companyLogo.includes('logo.dev') ? `${experience.companyLogo}?token=${process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY}` : experience.companyLogo}
                  alt={`${experience.companyName} logo`}
                  className="w-16 h-16 rounded-lg object-contain border bg-white flex-shrink-0"
                />
              ) : (
                <img
                  src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48`}
                  alt={`${experience.companyName || 'company'} logo`}
                  className="w-16 h-16 rounded-lg object-cover border flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-lg">{experience.title}</h4>
                <p className="text-primary font-medium">{experience.companyName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">
                    {formatMonthYearRange(
                      experience.startDateMonth, 
                      experience.startDateYear, 
                      experience.endDateMonth, 
                      experience.endDateYear, 
                      experience.currentlyWorking
                    )}
                  </p>
                  {experience.currentlyWorking && (
                    <Badge variant="secondary" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium mt-1">
                  {calculateExperience(
                    `${experience.startDateYear}-${experience.startDateMonth?.toString().padStart(2, '0')}-01`,
                    experience.endDateYear && experience.endDateMonth 
                      ? `${experience.endDateYear}-${experience.endDateMonth?.toString().padStart(2, '0')}-01`
                      : null,
                    experience.currentlyWorking
                  )} experience
                </p>
              </div>
              
              {/* Employment Details - Side Panel */}
              <div className="flex flex-col gap-2 min-w-0 flex-shrink-0">
                {experience.location && (
                  <Badge variant="outline" className="text-xs text-right">
                    {experience.location.city}{experience.location.state ? `, ${experience.location.state}` : ''}, {experience.location.country}
                  </Badge>
                )}

                <div className="flex flex-wrap gap-1 justify-end">
                  <Badge variant="secondary" className="text-xs">
                    {getLocationTypeLabel(experience.locationType)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {getEmploymentTypeLabel(experience.employmentType)}
                  </Badge>                  
                </div>                              
                
                {/* Domain badges */}
                {experience.domain && experience.domain.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {experience.domain.map((domain) => (
                      <Badge key={domain} variant="outline" className="text-xs">
                        {getDomainLabel(domain)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description with Tabs */}
            {(experience.descriptionGeneral || experience.descriptionLess || experience.descriptionDetailed) && (
              <div className="space-y-3">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="w-full">
                    {experience.descriptionGeneral && (
                      <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
                    )}
                    {experience.descriptionLess && (
                      <TabsTrigger value="short" className="flex-1">Short</TabsTrigger>
                    )}
                    {experience.descriptionDetailed && (
                      <TabsTrigger value="detailed" className="flex-1">Detailed</TabsTrigger>
                    )}
                  </TabsList>
                  {experience.descriptionGeneral && (
                    <TabsContent value="general" className="mt-3">
                      <p className="text-muted-foreground leading-relaxed">{experience.descriptionGeneral}</p>
                    </TabsContent>
                  )}
                  {experience.descriptionLess && (
                    <TabsContent value="short" className="mt-3">
                      <p className="text-muted-foreground leading-relaxed">{experience.descriptionLess}</p>
                    </TabsContent>
                  )}
                  {experience.descriptionDetailed && (
                    <TabsContent value="detailed" className="mt-3">
                      <p className="text-muted-foreground leading-relaxed">{experience.descriptionDetailed}</p>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}

            {/* Tools & Technologies */}
            {experience.toolsUsed && experience.toolsUsed.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-muted-foreground">Tools & Technologies</h5>
                <div className="flex flex-wrap gap-1">
                  {experience.toolsUsed.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
