/**
 * Type definitions for API Keys based on OpenAPI schema
 */

export interface CreateAPIKey {
  description?: string | null;
  expires_in?: string | null; // ISO 8601 date-time format
  roles?: string[] | null; // Array of Role enum values
}

export interface UpdateAPIKey {
  description?: string | null;
  active?: boolean | null;
  roles?: string[] | null;
}

export interface APIKeyResponse {
  key: string; // Plain API key (only returned on creation)
  id: string; // UUID
  created_at: string; // ISO 8601 date-time format
  expires_in?: string | null; // ISO 8601 date-time format
  description?: string | null;
}

export interface ReadAPIKey {
  id: string; // UUID
  created_at: string; // ISO 8601 date-time format
  updated_at: string; // ISO 8601 date-time format
  expires_in?: string | null; // ISO 8601 date-time format
  github_username: string;
  description?: string | null;
  active: boolean;
  roles: string[]; // Array of Role enum values
}

