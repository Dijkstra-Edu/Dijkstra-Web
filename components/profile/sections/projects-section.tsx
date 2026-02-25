// Projects Section Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2 } from "lucide-react";
import { useGetProjects, useAddProject, useUpdateProject, useDeleteProject } from "@/hooks/profile/use-projects";
import { ProjectsForm } from "./forms/projects-form";
import { ProjectsDisplay } from "./display/projects-display";
import { EditControls } from "../shared/edit-controls";
import { GenericSectionSkeleton } from "../shared/section-skeleton";
import { GenericSectionError } from "../shared/section-error";
import type { ProfileSectionProps } from "@/types/client/profile-section/profile-sections";

export function ProjectsSection({ profileId, githubUserName, isEditing, onToggleEdit }: ProfileSectionProps) {
  const { data: projects, isLoading, error, refetch } = useGetProjects(githubUserName);
  const addMutation = useAddProject(githubUserName);
  const updateMutation = useUpdateProject(githubUserName);
  const deleteMutation = useDeleteProject(githubUserName);

  if (isLoading) return <GenericSectionSkeleton  />;
  if (error) return <GenericSectionError error={error} onRetry={() => refetch()} title="Projects" />;

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
        {isEditing ? (
          <ProjectsForm 
            projects={projects || []}
            onAdd={(data) => addMutation.mutate({ data: { ...data, profileId } })}
            onUpdate={(data) => updateMutation.mutate({ projectId: data.id, data: data.data })}
            onDelete={(id) => deleteMutation.mutate({ projectId: id })}
            isAdding={addMutation.isPending}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
            onCancel={onToggleEdit}
          />
        ) : (
          <ProjectsDisplay data={projects || []} />
        )}
      </CardContent>
    </Card>
  );
}
