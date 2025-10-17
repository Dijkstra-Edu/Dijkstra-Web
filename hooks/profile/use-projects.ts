// Custom hook for projects

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  projectsQuery, 
  addProjectMutation, 
  updateProjectMutation, 
  deleteProjectMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useProjects(userId: string) {
  return useQuery(projectsQuery(userId));
}

export function useAddProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addProjectMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.projects.list(profileId) 
      });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateProjectMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.projects.list(profileId) 
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteProjectMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.projects.list(profileId) 
      });
    },
  });
}
