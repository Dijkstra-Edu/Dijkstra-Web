// Skills Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import { useSkills, useAddSkill, useUpdateSkill, useDeleteSkill } from "@/hooks/profile/use-skills";
import { SkillsForm } from "./forms/skills-form";
import { SkillsDisplay } from "./display/skills-display";
import { EditControls } from "../shared/edit-controls";
import { SkillsSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/profile-sections";

export function SkillsSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: skills, isLoading, error, refetch } = useSkills(profileId);
  const addMutation = useAddSkill();
  const updateMutation = useUpdateSkill();
  const deleteMutation = useDeleteSkill();

  if (isLoading) return <SkillsSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Skills" />;

  const handleSave = () => {
    // Save is handled by the form component
    onToggleEdit();
  };

  const handleCancel = () => {
    // Cancel is handled by the form component
    onToggleEdit();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </CardTitle>
          <EditControls 
            isEditing={isEditing}
            onToggleEdit={onToggleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <SkillsForm 
            skills={skills || []}
            onAdd={addMutation.mutate}
            onUpdate={updateMutation.mutate}
            onDelete={deleteMutation.mutate}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <SkillsDisplay data={skills || []} />
        )}
      </CardContent>
    </Card>
  );
}
