// Skills Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Info } from "lucide-react";
import { useGetSkills } from "@/hooks/profile/use-skills";
import { SkillsDisplay } from "./display/skills-display";
import { SkillsSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function SkillsSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: skills, isLoading, error, refetch } = useGetSkills(githubUserName);

  //TODO: Uncomment this when the skills are implemented
  // if (isLoading) return <SkillsSkeleton />;
  // if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Skills" />;
  if (error || isLoading)
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-5 w-5 shrink-0 text-primary" />
            <CardTitle className="text-base font-medium text-foreground">
              Skills will appear here
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Complete your profile before your skills can be computed and displayed.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <SkillsDisplay data={skills || []} />
      </CardContent>
    </Card>
  );
}
