// Custom hook for test scores

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTestScoresByGithubUsername,
  deleteTestScoresByTestScoreId,
  getTestScoresByGithubUsername,
  updateTestScoresByTestScoreId,
} from "@/services/profile/TestScoreService";
import { TestScoresData } from "@/types/client/profile-section/profile-sections";

export const useGetTestScores = (username: string) => {
  return useQuery({
    queryKey: ["test-scores", username],
    queryFn: () => getTestScoresByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
};

export const useAddTestScore = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: Omit<TestScoresData, "id" | "createdAt" | "updatedAt">;
    }) => {
      return addTestScoresByGithubUsername(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["test-scores", username],
      });
    },
  });
};

export const useUpdateTestScore = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      testScoreId,
      data,
    }: {
      testScoreId: string;
      data: Partial<TestScoresData>;
    }) => updateTestScoresByTestScoreId(testScoreId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["test-scores", username],
      });
    },
  });
};

export const useDeleteTestScore = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ testScoreId }: { testScoreId: string }) =>
      deleteTestScoresByTestScoreId(testScoreId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["test-scores", username],
      });
    },
  });
};
