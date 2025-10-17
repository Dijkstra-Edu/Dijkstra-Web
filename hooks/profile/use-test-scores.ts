// Custom hook for test scores

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  testScoresQuery, 
  addTestScoreMutation, 
  updateTestScoreMutation, 
  deleteTestScoreMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useTestScores(userId: string) {
  return useQuery(testScoresQuery(userId));
}

export function useAddTestScore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addTestScoreMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.testScores.list(profileId) 
      });
    },
  });
}

export function useUpdateTestScore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateTestScoreMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.testScores.list(profileId) 
      });
    },
  });
}

export function useDeleteTestScore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteTestScoreMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.testScores.list(profileId) 
      });
    },
  });
}
