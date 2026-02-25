import { apiCall } from "@/services/CoreApiService";
import type {
  CreateAPIKey,
  APIKeyResponse,
  ReadAPIKey,
} from "@/types/server/dataforge/User/api-keys";

const API_KEYS_PATH = "Dijkstra/v1/api-keys";

/**
 * List all API keys for the authenticated user.
 * Uses session JWT via CoreApiService → /api/dataforge/... → proxy.
 */
export async function listAPIKeysByGithubUsername(
  username: string
): Promise<ReadAPIKey[]> {
  const response = await apiCall<ReadAPIKey[]>(
    "dataforge",
    `${API_KEYS_PATH}/${encodeURIComponent(username)}`
  );
  return response ?? [];
}

/**
 * Create a new API key for the authenticated user.
 */
export async function createAPIKeyByGithubUsername(
  username: string,
  data: CreateAPIKey
): Promise<APIKeyResponse> {
  return apiCall<APIKeyResponse>(
    "dataforge",
    `${API_KEYS_PATH}/${encodeURIComponent(username)}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Revoke an API key (DELETE on backend).
 */
export async function revokeAPIKeyByKeyId(keyId: string): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${API_KEYS_PATH}/${encodeURIComponent(keyId)}`,
    { method: "DELETE" }
  );
}
