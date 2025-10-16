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
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.certifications(userId) 
      });
    },
  });
}

export function useUpdateCertification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteCertification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
