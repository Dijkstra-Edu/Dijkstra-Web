// Custom hook for certifications

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import { getCertificationsQuery, addCertificationMutation, updateCertificationsMutation, deleteCertificationsMutation } from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export function useCertifications(username: string) {
  return useQuery(getCertificationsQuery(username));
}

export function useAddCertification(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['certifications', username]
      });
    },
  });
}

export function useUpdateCertification(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateCertificationsMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['certifications', username]  
      });
    },
  });
}

export function useDeleteCertification(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteCertificationsMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['certifications', username] 
      });
    },
  });
}
