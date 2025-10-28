// Publications Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { usePublications, useAddPublication, useUpdatePublication, useDeletePublication } from "@/hooks/profile/use-publications";
import { PublicationsForm } from "./forms/publications-form";
import { PublicationsDisplay } from "./display/publications-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function PublicationsSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: publications, isLoading, error, refetch } = usePublications(profileId);
  const addMutation = useAddPublication();
  const updateMutation = useUpdatePublication();
  const deleteMutation = useDeletePublication();

  if (isLoading) return <GenericSectionSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Publications" />;

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
            <FileText className="w-5 h-5" />
            Publications
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
          <PublicationsForm 
            publications={publications || []}
            onAdd={(data) => addMutation.mutate({ profileId, data })}
            onUpdate={(data) => updateMutation.mutate({ profileId, id: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ profileId, id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <PublicationsDisplay data={publications || []} />
        )}
      </CardContent>
    </Card>
  );
}
