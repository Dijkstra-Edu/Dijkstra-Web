// Custom hook for publications

import { getPublicationsByGithubUsername, addPublicationsByGithubUsername, updatePublicationsByPublicationId, deletePublicationsByPublicationId } from '@/services/profile/PublicationService';
import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { PublicationsData } from '@/types/client/profile-section/profile-sections';

export function usePublications(username: string) {
  return useQuery(queryOptions({
    queryKey: ['publications', username],
    queryFn: () => getPublicationsByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
}));
}

export function useAddPublication(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data }: { data: Omit<PublicationsData, 'id' | 'createdAt' | 'updatedAt'> }) => {
      return addPublicationsByGithubUsername(data);
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['publications', username] 
      });
    },
  });
}

export function useUpdatePublication(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ publicationId, data }: { publicationId: string; data: Partial<PublicationsData> }) => 
      updatePublicationsByPublicationId(publicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['publications', username] 
      });
    },
  });
}

export function useDeletePublication(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ publicationId }: { publicationId: string }) => 
      deletePublicationsByPublicationId(publicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['publications', username] 
      });
    },
  });
}
