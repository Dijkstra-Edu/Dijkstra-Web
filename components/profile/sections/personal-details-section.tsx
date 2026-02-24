// Personal Details Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { PersonalDetailsForm } from "./forms/personal-details-form";
import { PersonalDetailsDisplay } from "./display/personal-details-display";
import { EditControls } from "../shared/edit-controls";
import { PersonalDetailsSkeleton } from "../shared/section-skeleton";
import { PersonalDetailsError as ErrorComponent } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";
import { useGetPersonalDetails, useUpdatePersonalDetails } from "@/hooks/profile/use-personal-details";

export function PersonalDetailsSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: personalDetails, isLoading, error, refetch } = useGetPersonalDetails(githubUserName);
  const updateMutation = useUpdatePersonalDetails(githubUserName);

  if (isLoading) return <PersonalDetailsSkeleton />;
  if (error) return <ErrorComponent error={error} onRetry={() => refetch()} />;

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
            <User className="w-5 h-5" />
            Personal Details
          </CardTitle>
          <EditControls 
            isEditing={isEditing}
            onToggleEdit={onToggleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={updateMutation.isPending}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <PersonalDetailsForm 
            data={personalDetails}
            onUpdate={(data) => updateMutation.mutate({ username: githubUserName, data: data })}
            onCancel={onToggleEdit}
            isLoading={updateMutation.isPending}
          />
        ) : (
          <PersonalDetailsDisplay data={personalDetails || undefined} />
        )}
      </CardContent>
    </Card>
  );
}