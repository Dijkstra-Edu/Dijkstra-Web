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
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.volunteering.list(profileId) 
      });
    },
  });
}

export function useUpdateVolunteering() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateVolunteeringMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.volunteering.list(profileId) 
      });
    },
  });
}

export function useDeleteVolunteering() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteVolunteeringMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.volunteering.list(profileId) 
      });
    },
  });
}
