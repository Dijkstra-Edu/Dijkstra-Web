import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { CreateAPIKey, UpdateAPIKey, ReadAPIKey, APIKeyResponse } from "@/types/server/dataforge/User/api-keys";

/**
 * Query options for listing all API keys
 */
export const listAPIKeysQuery = () =>
  queryOptions({
    queryKey: ["api-keys", "list"],
    queryFn: async () => {
      const response = await fetch("/api/api-keys");
      if (!response.ok) {
        throw new Error("Failed to fetch API keys");
      }
      return response.json() as Promise<ReadAPIKey[]>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

/**
 * Query options for getting a specific API key
 */
export const getAPIKeyQuery = (keyId: string) =>
  queryOptions({
    queryKey: ["api-keys", keyId],
    queryFn: async () => {
      const response = await fetch(`/api/api-keys/${encodeURIComponent(keyId)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch API key");
      }
      return response.json() as Promise<ReadAPIKey>;
    },
    enabled: !!keyId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

/**
 * Mutation options for creating an API key
 */
export const createAPIKeyMutation = mutationOptions({
  mutationFn: async (data: CreateAPIKey) => {
    const response = await fetch("/api/api-keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create API key");
    }
    return response.json() as Promise<APIKeyResponse>;
  },
});

/**
 * Mutation options for revoking an API key
 */
export const revokeAPIKeyMutation = mutationOptions({
  mutationFn: async (keyId: string) => {
    const response = await fetch(`/api/api-keys/${encodeURIComponent(keyId)}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to revoke API key");
    }
  },
});

/**
 * Mutation options for updating an API key
 */
export const updateAPIKeyMutation = mutationOptions({
  mutationFn: async ({ keyId, data }: { keyId: string; data: UpdateAPIKey }) => {
    const response = await fetch(`/api/api-keys/${encodeURIComponent(keyId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update API key");
    }
    return response.json() as Promise<ReadAPIKey>;
  },
});

