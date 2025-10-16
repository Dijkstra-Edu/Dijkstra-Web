// Custom hook for work experience

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  workExperienceQuery, 
  addWorkExperienceMutation, 
  updateWorkExperienceMutation, 
  deleteWorkExperienceMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useWorkExperience(profileId: string) {
  return useQuery(workExperienceQuery(profileId));
}

export function useAddWorkExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addWorkExperienceMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.workExperience.list(profileId) 
      });
    },
  });
}

export function useUpdateWorkExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateWorkExperienceMutation,
    onSuccess: (_, { id }) => {
      // Find userId from the updated experience and invalidate
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteWorkExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteWorkExperienceMutation,
    onSuccess: (_, id) => {
      // Find userId from the deleted experience and invalidate
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
