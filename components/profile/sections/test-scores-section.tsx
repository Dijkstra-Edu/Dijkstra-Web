// Test Scores Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useTestScores, useAddTestScore, useUpdateTestScore, useDeleteTestScore } from "@/hooks/profile/use-test-scores";
import { TestScoresForm } from "./forms/test-scores-form";
import { TestScoresDisplay } from "./display/test-scores-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function TestScoresSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: testScores, isLoading, error, refetch } = useTestScores(profileId);
  const addMutation = useAddTestScore();
  const updateMutation = useUpdateTestScore();
  const deleteMutation = useDeleteTestScore();

  if (isLoading) return <GenericSectionSkeleton />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Test Scores" />;

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
            Test Scores
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
          <TestScoresForm 
            testScores={testScores || []}
            onAdd={(data) => addMutation.mutate({ profileId, data })}
            onUpdate={(data) => updateMutation.mutate({ profileId, id: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ profileId, id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <TestScoresDisplay data={testScores || []} />
        )}
      </CardContent>
    </Card>
  );
}
