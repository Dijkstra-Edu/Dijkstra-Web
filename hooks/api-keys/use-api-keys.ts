"use client";

import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import type { APIKeyResponse, CreateAPIKey } from "@/types/server/dataforge/User/api-keys";
import { createAPIKeyByGithubUsername, listAPIKeysByGithubUsername, revokeAPIKeyByKeyId } from "@/services/user/APIKeyService";

/**
 * Hook to fetch all API keys
 */
export function useGetAllAPIKeysByGithubUsername(username: string) {
  return useQuery(
    queryOptions({
      queryKey: ["api-keys", "list", username],
      queryFn: () => listAPIKeysByGithubUsername(username),
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    })
  );
}

/**
 * Hook to create a new API key
 */
export function useCreateAPIKeyByGithubUsername(username: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: CreateAPIKey }) =>
      createAPIKeyByGithubUsername(username, data),
    onSuccess: () => {
      // Invalidate and refetch API keys list
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}

/**
 * Hook to revoke an API key
 */
export function useRevokeAPIKeyByKeyId(keyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => 
      revokeAPIKeyByKeyId(keyId),
    onSuccess: () => {
      // Invalidate and refetch API keys list
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}
