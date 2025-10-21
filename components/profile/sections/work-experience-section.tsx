// Work Experience Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useWorkExperience, useAddWorkExperience, useUpdateWorkExperience, useDeleteWorkExperience } from "@/hooks/profile/use-work-experience";
import { WorkExperienceForm } from "./forms/work-experience-form";
import { WorkExperienceDisplay } from "./display/work-experience-display";
import { EditControls } from "../shared/edit-controls";
import { WorkExperienceSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperienceQuery } from "@/server/dataforge/User/QueryOptions/user.queryOptions";

export function WorkExperienceSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  /*const { data: experiences, isLoading, error, refetch } = useWorkExperience(profileId);*/
  const { data: experiences, isLoading, error, refetch } = useQuery(getWorkExperienceQuery(githubUserName));
  console.log(experiences);
  const addMutation = useAddWorkExperience();
  const updateMutation = useUpdateWorkExperience();
  const deleteMutation = useDeleteWorkExperience();

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
            experiences={experiences || []}
            onAdd={(data) => addMutation.mutate({ profileId, data })}
            onUpdate={(data) => updateMutation.mutate({ profileId, id: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ profileId, id })}
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
