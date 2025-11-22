// Custom hook for test scores

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTestScoresQuery, 
  addTestScoreMutation, 
  updateTestScoresMutation, 
  deleteTestScoresMutation 
} from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export function useTestScores(username: string) {
  return useQuery(getTestScoresQuery(username));
}

export function useAddTestScore(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addTestScoreMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['test-scores', username] 
      });
    },
  });
}

export function useUpdateTestScore(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateTestScoresMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['test-scores', username] 
      });
    },
  });
}

export function useDeleteTestScore(username: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteTestScoresMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['test-scores', username] 
      });
    },
  });
}
