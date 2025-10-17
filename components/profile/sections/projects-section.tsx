// Projects Section Component (Placeholder)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2 } from "lucide-react";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function ProjectsSection({ profileId, isEditing, onToggleEdit }: ProfileSectionProps) {
  // TODO: Implement projects section with TanStack Query
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
            <FolderGit2 className="w-5 h-5" />
            Projects
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
          Projects section will be implemented here
        </p>
      </CardContent>
    </Card>
  );
}
