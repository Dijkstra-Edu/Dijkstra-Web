// Custom hook for education

import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { getEducationByGithubUsername, addEducationByGithubUsername, updateEducationByEducationId, deleteEducationByEducationId } from '@/services/profile/EducationService';
import { EducationData } from '@/types/client/profile-section/profile-sections';

export function useEducation(username: string) {
  return useQuery(
    queryOptions({
      queryKey: ['education', username],
      queryFn: () => getEducationByGithubUsername(username),
      enabled: !!username,
      staleTime: 1000 * 60 * 5, // avoid instant refetch
      gcTime: 1000 * 60 * 30, // keep data cached longer
    })
  );
}

export function useAddEducation(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data }: { data: Omit<EducationData, 'id' | 'createdAt' | 'updatedAt'> }) => {
      return addEducationByGithubUsername(data);
  },
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
    mutationFn: ({ educationId, data }: { educationId: string; data: Partial<EducationData> }) => 
      updateEducationByEducationId(educationId, data),
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
    mutationFn: ({ educationId }: { educationId: string }) => 
      deleteEducationByEducationId(educationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['education', username] 
      });
    },
  });
}
