// Certifications Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useCertifications, useAddCertification, useUpdateCertification, useDeleteCertification } from "@/hooks/profile/use-certifications";
import { CertificationsForm } from "./forms/certifications-form";
import { CertificationsDisplay } from "./display/certifications-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function CertificationsSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: certifications, isLoading, error, refetch } = useCertifications(profileId);
  const addMutation = useAddCertification();
  const updateMutation = useUpdateCertification();
  const deleteMutation = useDeleteCertification();

  if (isLoading) return <GenericSectionSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Certifications" />;

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
            <Award className="w-5 h-5" />
            Certifications
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
          <CertificationsForm 
            certifications={certifications || []}
            onAdd={(data) => addMutation.mutate({ profileId, data })}
            onUpdate={(data) => updateMutation.mutate({ profileId, id: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ profileId, id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <CertificationsDisplay data={certifications || []} />
        )}
      </CardContent>
    </Card>
  );
}
