// Custom hook for certifications

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  certificationsQuery, 
  addCertificationMutation, 
  updateCertificationMutation, 
  deleteCertificationMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useCertifications(userId: string) {
  return useQuery(certificationsQuery(userId));
}

export function useAddCertification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addCertificationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.certifications.list(profileId) 
      });
    },
  });
}

export function useUpdateCertification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateCertificationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.certifications.list(profileId) 
      });
    },
  });
}

export function useDeleteCertification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteCertificationMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.certifications.list(profileId) 
      });
    },
  });
}
