// Custom hook for publications

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPublicationsQuery, 
  addPublicationMutation, 
  updatePublicationsMutation, 
  deletePublicationsMutation 
} from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export function usePublications(username: string) {
  return useQuery(getPublicationsQuery(username));
}

export function useAddPublication(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addPublicationMutation,
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
    ...updatePublicationsMutation,
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
    ...deletePublicationsMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['publications', username] 
      });
    },
  });
}
