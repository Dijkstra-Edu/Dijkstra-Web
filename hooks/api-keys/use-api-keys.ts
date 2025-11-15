"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listAPIKeysQuery,
  getAPIKeyQuery,
  createAPIKeyMutation,
  revokeAPIKeyMutation,
  updateAPIKeyMutation,
} from "@/server/dataforge/API/QueryOptions/api-keys.queryOptions";
import type { CreateAPIKey, UpdateAPIKey } from "@/types/server/dataforge/User/api-keys";

/**
 * Hook to fetch all API keys
 */
export function useAPIKeys() {
  return useQuery(listAPIKeysQuery());
}

/**
 * Hook to fetch a specific API key
 */
export function useAPIKey(keyId: string) {
  return useQuery(getAPIKeyQuery(keyId));
}

/**
 * Hook to create a new API key
 */
export function useCreateAPIKey() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createAPIKeyMutation,
    onSuccess: () => {
      // Invalidate and refetch API keys list
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}

/**
 * Hook to revoke an API key
 */
export function useRevokeAPIKey() {
  const queryClient = useQueryClient();

  return useMutation({
    ...revokeAPIKeyMutation,
    onSuccess: () => {
      // Invalidate and refetch API keys list
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}

/**
 * Hook to update an API key
 */
export function useUpdateAPIKey() {
  const queryClient = useQueryClient();

  return useMutation({
    ...updateAPIKeyMutation,
    onSuccess: (_, variables) => {
      // Invalidate and refetch API keys list and specific key
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["api-keys", variables.keyId] });
    },
  });
}

