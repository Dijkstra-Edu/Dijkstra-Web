/**
 * API Constants
 * Contains base URLs and endpoints for external APIs
 */

export const API_ENDPOINTS = {
  LOGO_DEV_SEARCH: "https://api.logo.dev/search",
  NOMINATIM_SEARCH: "https://nominatim.openstreetmap.org/search",
  DATAFORGE_API: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
} as const

export const API_URLS = {
  /**
   * Logo.dev search endpoint for company/institution logos
   * @param query - The search query parameter
   * @returns Complete URL with query parameter
   */
  logoDevSearch: (query: string) => `${API_ENDPOINTS.LOGO_DEV_SEARCH}?q=${encodeURIComponent(query)}`,
  /**
   * OpenStreetMap Nominatim search endpoint for locations
   * @param query - The search query parameter
   * @returns Complete URL with query parameter and required options
   */
  nominatimSearch: (query: string) => `${API_ENDPOINTS.NOMINATIM_SEARCH}?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
  
  getUserData: (githubUsername: string, allData: boolean = true) => 
    `${API_ENDPOINTS.DATAFORGE_API}/Dijkstra/v1/u/${encodeURIComponent(githubUsername)}${allData ? '?all_data=true' : ''}`,
} as const