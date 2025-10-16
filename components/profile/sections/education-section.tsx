// Education Section Component (Placeholder)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import type { ProfileSectionProps } from "@/types/profile-sections";

export function EducationSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  // TODO: Implement education section with TanStack Query
  // This is a placeholder component
  
  const handleSave = () => {
    onToggleEdit();
  };

  const handleCancel = () => {
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
        <GenericSectionSkeleton />
        <p className="text-center text-muted-foreground mt-4">
          Education section will be implemented here
        </p>
      </CardContent>
    </Card>
  );
}
