// Personal Details Display Component

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import { CareerPathCard } from "../../shared/career-path-card";
import { SALARY_RANGES } from "@/constants/profile-constants";
import { formatTimeDisplay } from "@/lib/profile/profile-utils";
import type { PersonalDetailsData } from "@/types/profile-sections";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";

interface PersonalDetailsDisplayProps {
  data: PersonalDetailsData | undefined;
}

export function PersonalDetailsDisplay({ data }: PersonalDetailsDisplayProps) {
  if (!data) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No personal details available
      </div>
    );
  }

  const selectedCompanyData = data.dreamCompany ? { name: data.dreamCompany } : null;
  const salaryRange = SALARY_RANGES.find(s => s.value === data.wantedSalary);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-2xl font-bold">{data.name}</h3>
        <Badge variant="secondary" className="mt-1">
          {data.title}
        </Badge>
      </div>

      <p className="text-muted-foreground">{data.bio}</p>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{data.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{data.email}</span>
        </div>
        {data.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{data.phone}</span>
          </div>
        )}
        {data.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span>{data.website}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span>github.com/{data.github}</span>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="w-4 h-4 text-muted-foreground" />
          <span>linkedin.com/in/{data.linkedin}</span>
        </div>
      </div>

      <Separator />

      {/* Career Goals */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold">Career Goals</h4>

        {/* Dream Company and Position Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-muted-foreground text-sm">Dream Company:</span>
            <div className="flex items-center gap-3 mt-1">
              {selectedCompanyData?.logo_url ? (
                <img 
                  src={selectedCompanyData.logo_url} 
                  alt={`${data.dreamCompany} logo`}
                  className="w-8 h-8 rounded-lg object-contain border bg-white"
                />
              ) : (
                <img
                  src={`/abstract-geometric-shapes.png?key=kh3mj&height=32&width=32&query=${encodeURIComponent(`${data.dreamCompany} company logo`)}`}
                  alt={`${data.dreamCompany} logo`}
                  className="w-8 h-8 rounded-lg object-cover border bg-white"
                />
              )}
              <p className="font-medium">{data.dreamCompany}</p>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Dream Position:</span>
            <p className="font-medium">{data.dreamPosition}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Wanted Salary:</span>
            <p className="font-medium">
              {salaryRange?.label || data.wantedSalary}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Time Frame:</span>
            <p className="font-medium">{formatTimeDisplay(data.timeFrame)}</p>
          </div>
        </div>

        {/* Career Paths Section */}
        <div>
          <span className="text-muted-foreground text-sm block mb-4">
            Career Specializations:
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Specialization Column */}
            <div>
              <h5 className="text-sm font-semibold text-muted-foreground mb-3">Primary Specialization</h5>
              <div className="flex justify-center lg:justify-start">
                <CareerPathCard
                  pathKey={data.primaryPath as CareerPathKey}
                  isPrimary={true}
                  onClick={() => {}}
                  showBadge={true}
                  displayMode={true}
                />
              </div>
            </div>

            {/* Secondary Specializations Column */}
            <div>
              <h5 className="text-sm font-semibold text-muted-foreground mb-3">Secondary Specializations</h5>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {data.secondaryPaths.map((pathKey) => (
                  <CareerPathCard
                    key={pathKey}
                    pathKey={pathKey as CareerPathKey}
                    isSecondary={true}
                    onClick={() => {}}
                    showBadge={true}
                    displayMode={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
