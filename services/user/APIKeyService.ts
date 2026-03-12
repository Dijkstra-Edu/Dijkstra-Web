import { apiCall } from "@/services/CoreApiService";
import type {
  CreateAPIKey,
  APIKeyResponse,
  ReadAPIKey,
} from "@/types/server/dataforge/User/api-keys";

const API_KEYS_PATH = "Dijkstra/v1/api-keys";

/**
 * List all API keys for the given GitHub username.
 * Uses session JWT via CoreApiService → /api/dataforge/... → proxy.
 * Backend path: GET /Dijkstra/v1/api-keys/{github_username}
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
 * Create a new API key for the given GitHub username.
 * Backend path: POST /Dijkstra/v1/api-keys/{github_username}
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
 * Path: DELETE /Dijkstra/v1/api-keys/{api_key_id}
 */
export async function revokeAPIKeyByKeyId(keyId: string): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${API_KEYS_PATH}/${encodeURIComponent(keyId)}`,
    { method: "DELETE" }
  );
}
