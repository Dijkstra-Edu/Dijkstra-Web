// Custom hook for education

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  educationQuery, 
  addEducationMutation, 
  updateEducationMutation, 
  deleteEducationMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useEducation(userId: string) {
  return useQuery(educationQuery(userId));
}

export function useAddEducation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addEducationMutation,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.education(userId) 
      });
    },
  });
}

export function useUpdateEducation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateEducationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteEducation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteEducationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
