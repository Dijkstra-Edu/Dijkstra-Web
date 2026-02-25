// Custom hook for certifications

import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { getCertificationsByGithubUsername, addCertificationsByGithubUsername, updateCertificationsByCertificationId, deleteCertificationsByCertificationId } from '@/services/profile/CertificationService';
import { CertificationsData } from '@/types/client/profile-section/profile-sections';

export function useCertifications(username: string) {
  return useQuery(
    queryOptions({
      queryKey: ['certifications', username],
      queryFn: () => getCertificationsByGithubUsername(username),
      enabled: !!username,
      staleTime: 1000 * 60 * 5, // avoid instant refetch
      gcTime: 1000 * 60 * 30, // keep data cached longer
  })
  );
}

export function useAddCertification(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data }: { data: Omit<CertificationsData, 'id' | 'createdAt' | 'updatedAt'> }) => {
      return addCertificationsByGithubUsername(data);
  },
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
    mutationFn: ({ certificationId, data }: { certificationId: string; data: Partial<CertificationsData> }) => 
      updateCertificationsByCertificationId(certificationId, data),
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
    mutationFn: ({ certificationId }: { certificationId: string }) => 
      deleteCertificationsByCertificationId(certificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['certifications', username] 
      });
    },
  });
}
