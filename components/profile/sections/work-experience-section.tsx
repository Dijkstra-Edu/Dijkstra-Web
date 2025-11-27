// Work Experience Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { WorkExperienceForm } from "./forms/work-experience-form";
import { WorkExperienceDisplay } from "./display/work-experience-display";
import { EditControls } from "../shared/edit-controls";
import { WorkExperienceSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperienceQuery } from "@/server/dataforge/User/QueryOptions/user.queryOptions";
import { useAddWorkExperienceMutation, useUpdateWorkExperienceMutation, useDeleteWorkExperienceMutation, useWorkExperience } from "@/hooks/profile/use-work-experience";

export function WorkExperienceSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: experiences, isLoading, error, refetch } = useWorkExperience(githubUserName);
  const addMutation = useAddWorkExperienceMutation(githubUserName);
  const updateMutation = useUpdateWorkExperienceMutation(githubUserName);
  const deleteMutation = useDeleteWorkExperienceMutation(githubUserName);

  if (isLoading) return <WorkExperienceSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Work Experience" />;

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
            <Briefcase className="w-5 h-5" />
            Work Experience
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
          <WorkExperienceForm 
            profileId={profileId}
            experiences={experiences || []}
            onAdd={(data) => addMutation.mutate({ data })}
            onUpdate={(data) => updateMutation.mutate({ workExperienceId: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ workExperienceId: id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <WorkExperienceDisplay data={experiences || []} />
        )}
      </CardContent>
    </Card>
  );
}
