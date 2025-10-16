// Custom hook for volunteering

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  volunteeringQuery, 
  addVolunteeringMutation, 
  updateVolunteeringMutation, 
  deleteVolunteeringMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useVolunteering(userId: string) {
  return useQuery(volunteeringQuery(userId));
}

export function useAddVolunteering() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addVolunteeringMutation,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.volunteering(userId) 
      });
    },
  });
}

export function useUpdateVolunteering() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateVolunteeringMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteVolunteering() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteVolunteeringMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
