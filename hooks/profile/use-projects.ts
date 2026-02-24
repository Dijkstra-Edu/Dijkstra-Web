// Custom hook for volunteering
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsData } from "@/types/client/profile-section/profile-sections";
import { addProjectByGithubUsername, deleteProjectByProjectId, getProjectsByGithubUsername, updateProjectByProjectId } from "@/services/profile/ProjectService";

export const useGetProjects = (username: string) => {
  return useQuery({
    queryKey: ["projects", username],
    queryFn: () => getProjectsByGithubUsername(username), //call service -> Core API -> /api/
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
}

export const useAddProject = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: Omit<ProjectsData, "id" | "createdAt" | "updatedAt">;
    }) => {
      return addProjectByGithubUsername(data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", username],
      });
    },
  });
};

export const useUpdateProject = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: Partial<ProjectsData>;
    }) => {
      return updateProjectByProjectId(projectId, data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["projects", username],
      });
    },
  });
};

export const useDeleteProject = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }: { projectId: string }) => {
      return deleteProjectByProjectId(projectId); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["projects", username],
      });
    },
  });
};
