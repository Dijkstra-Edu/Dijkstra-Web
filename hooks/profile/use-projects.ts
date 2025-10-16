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
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.projects(userId) 
      });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateProjectMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteProjectMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
