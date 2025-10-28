// Custom hook for personal details

import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { personalDetailsQuery, updatePersonalDetailsMutation } from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useUpdatePersonalDetails() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updatePersonalDetailsMutation,
    onSuccess: (_, { userId }) => {
      // Invalidate and refetch personal details
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.personalDetails(userId) 
      });
    },
  });
}
