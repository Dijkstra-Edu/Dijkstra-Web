/**
 * NOTE: This file is currently unused.
 * API keys require JWT authentication, so requests go through Next.js API routes
 * (app/api/api-keys/route.ts) which handle JWT token extraction and forwarding.
 * 
 * These functions are kept for potential future server-side usage.
 */

import { fetchDataForge } from "../client";
import type { CreateAPIKey, UpdateAPIKey, APIKeyResponse, ReadAPIKey } from "@/types/server/dataforge/User/api-keys";

/**
 * List all API keys for the authenticated user
 * @deprecated Use Next.js API routes instead (app/api/api-keys/route.ts)
 */
export async function listAPIKeys(): Promise<ReadAPIKey[]> {
  return fetchDataForge<ReadAPIKey[]>("/Dijkstra/v1/api-keys/");
}

/**
 * Create a new API key
 * @deprecated Use Next.js API routes instead (app/api/api-keys/route.ts)
 */
export async function createAPIKey(data: CreateAPIKey): Promise<APIKeyResponse> {
  return fetchDataForge<APIKeyResponse>("/Dijkstra/v1/api-keys/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get a specific API key by ID
 * @deprecated Use Next.js API routes instead (app/api/api-keys/[keyId]/route.ts)
 */
export async function getAPIKey(keyId: string): Promise<ReadAPIKey> {
  return fetchDataForge<ReadAPIKey>(`/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`);
}

/**
 * Revoke an API key (sets active=false)
 * @deprecated Use Next.js API routes instead (app/api/api-keys/[keyId]/route.ts)
 */
export async function revokeAPIKey(keyId: string): Promise<void> {
  return fetchDataForge<void>(`/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`, {
    method: "DELETE",
  });
}

/**
 * Update an API key (description, active status, roles)
 * @deprecated Use Next.js API routes instead (app/api/api-keys/[keyId]/route.ts)
 */
export async function updateAPIKey(keyId: string, data: UpdateAPIKey): Promise<ReadAPIKey> {
  return fetchDataForge<ReadAPIKey>(`/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

