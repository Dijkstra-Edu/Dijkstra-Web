// Custom hook for publications

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  publicationsQuery, 
  addPublicationMutation, 
  updatePublicationMutation, 
  deletePublicationMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function usePublications(userId: string) {
  return useQuery(publicationsQuery(userId));
}

export function useAddPublication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addPublicationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.publications.list(profileId) 
      });
    },
  });
}

export function useUpdatePublication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updatePublicationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.publications.list(profileId) 
      });
    },
  });
}

export function useDeletePublication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deletePublicationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.publications.list(profileId) 
      });
    },
  });
}
