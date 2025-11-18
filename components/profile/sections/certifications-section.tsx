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

export function CertificationsSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: certifications, isLoading, error, refetch } = useCertifications(githubUserName);
  const addMutation = useAddCertification(githubUserName);
  const updateMutation = useUpdateCertification(githubUserName);
  const deleteMutation = useDeleteCertification(githubUserName);
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
            profileId={profileId}
            certifications={certifications || []}
            onAdd={(data) => addMutation.mutate({ data })}
            onUpdate={(data) => updateMutation.mutate({ certificationId:data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({certificationId:id })}
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
