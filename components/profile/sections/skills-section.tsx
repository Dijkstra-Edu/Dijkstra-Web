// Skills Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import { useSkills, useAddSkill, useUpdateSkill, useDeleteSkill } from "@/hooks/profile/use-skills";
import { SkillsForm } from "./forms/skills-form";
import { SkillsDisplay } from "./display/skills-display";
import { EditControls } from "../shared/edit-controls";
import { SkillsSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function SkillsSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: skills, isLoading, error, refetch } = useSkills(profileId);

  if (isLoading) return <SkillsSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Skills" />;

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
