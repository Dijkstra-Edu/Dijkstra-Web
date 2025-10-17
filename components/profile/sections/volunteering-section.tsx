// Volunteering Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useVolunteering, useAddVolunteering, useUpdateVolunteering, useDeleteVolunteering } from "@/hooks/profile/use-volunteering";
import { VolunteeringForm } from "./forms/volunteering-form";
import { VolunteeringDisplay } from "./display/volunteering-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function VolunteeringSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: volunteerings, isLoading, error, refetch } = useVolunteering(profileId);
  const addMutation = useAddVolunteering();
  const updateMutation = useUpdateVolunteering();
  const deleteMutation = useDeleteVolunteering();

  if (isLoading) return <GenericSectionSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Volunteering" />;

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
            <Heart className="w-5 h-5" />
            Volunteering
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
          <VolunteeringForm 
            volunteerings={volunteerings || []}
            onAdd={(data) => addMutation.mutate({ profileId, data })}
            onUpdate={(data) => updateMutation.mutate({ profileId, id: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ profileId, id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <VolunteeringDisplay data={volunteerings || []} />
        )}
      </CardContent>
    </Card>
  );
}
