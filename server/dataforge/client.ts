/**
 * Shared DataForge client for consistent API calls
 * Server-only module for calling DataForge backend
 */

import { Rank, Domain, Tools } from "@/types/server/dataforge/enums";

export interface DataForgeError {
  error: string;
  message: string;
  details?: string;
}


/**
 * Get the DataForge base URL from environment variables
 * @throws Error if NEXT_PUBLIC_DATAFORGE_SERVICE_URL is not set
 */
export function getDataForgeBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_DATAFORGE_SERVICE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_DATAFORGE_SERVICE_URL environment variable is not set');
  }
  return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
}

/**
 * Make a request to DataForge backend with consistent error handling
 * @param path - API path (e.g., '/Dijkstra/v1/u/onboard')
 * @param init - Fetch options
 * @returns Parsed JSON response
 * @throws Error with meaningful message on failure
 */
export async function fetchDataForge<T = any>(
  path: string, 
  init?: RequestInit
): Promise<T> {
  const baseUrl = getDataForgeBaseUrl();
  const url = `${baseUrl}${path}`;
    
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    if (!response.ok) {
      // Read response body as text first to avoid "body already read" error
      const responseText = await response.text();
      let errorData: DataForgeError;
      
      try {
        // Try to parse the text as JSON
        errorData = JSON.parse(responseText);
      } catch (e) {
        // Response is not JSON
        console.error('DataForge error (non-JSON):', response.status, responseText);
        errorData = { 
          error: 'Backend error',
          message: responseText || `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      console.error('DataForge error:', response.status, errorData);
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        throw new Error(`Backend service unavailable: Unable to connect to DataForge at ${baseUrl}`);
      }
      throw error;
    }
    throw new Error('Unknown error occurred while calling DataForge');
  }
}
