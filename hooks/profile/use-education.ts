// Custom hook for education

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getEducationQuery, 
  addEducationMutation, 
  updateEducationMutation, 
  deleteEducationMutation 
} from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export function useEducation(username: string) {
  return useQuery(getEducationQuery(username));
}

export function useAddEducation(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addEducationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['education', username] 
      });
    },
  });
}

export function useUpdateEducation(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateEducationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['education', username] 
      });
    },
  });
}

export function useDeleteEducation(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteEducationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['education', username] 
      });
    },
  });
}
