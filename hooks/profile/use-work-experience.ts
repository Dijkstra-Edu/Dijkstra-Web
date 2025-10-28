// Custom hook for work experience

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addWorkExperienceMutation, deleteWorkExperienceMutation, updateWorkExperienceMutation } from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export const useAddWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
      ...addWorkExperienceMutation,
      onSuccess: () => {
          // Invalidate and refetch work experience data
          queryClient.invalidateQueries({ 
              queryKey: ['work-experience', username] 
          });
      },
  });
};

export const useUpdateWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
      ...updateWorkExperienceMutation,
      onSuccess: () => {
          // Invalidate and refetch work experience data
          queryClient.invalidateQueries({ 
              queryKey: ['work-experience', username] 
          });
      },
  });
};

export const useDeleteWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
      ...deleteWorkExperienceMutation,
      onSuccess: () => {
          // Invalidate and refetch work experience data
          queryClient.invalidateQueries({ 
              queryKey: ['work-experience', username] 
          });
      },
  });
};
