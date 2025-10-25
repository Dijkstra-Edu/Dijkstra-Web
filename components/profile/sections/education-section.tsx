// Education Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useEducation, useAddEducation, useUpdateEducation, useDeleteEducation } from "@/hooks/profile/use-education";
import { EducationForm } from "./forms/education-form";
import { EducationDisplay } from "./display/education-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton  } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function EducationSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: educations, isLoading, error, refetch } = useEducation(githubUserName);
  const addMutation = useAddEducation(githubUserName);
  const updateMutation = useUpdateEducation(githubUserName);
  const deleteMutation = useDeleteEducation(githubUserName);

  if (isLoading) return <GenericSectionSkeleton  />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Education" />;

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
            <GraduationCap className="w-5 h-5" />
            Education
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
          <EducationForm 
            educations={educations || []}
            onAdd={(data) => addMutation.mutate({ data })}
            onUpdate={(data) => updateMutation.mutate({ educationId: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ educationId: id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <EducationDisplay data={educations || []} />
        )}
      </CardContent>
    </Card>
  );
}
