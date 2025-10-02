/**
 * API Constants
 * Contains base URLs and endpoints for external APIs
 */

export const API_ENDPOINTS = {
  LOGO_DEV_SEARCH: "https://api.logo.dev/search",
} as const

export const API_URLS = {
  /**
   * Logo.dev search endpoint for company/institution logos
   * @param query - The search query parameter
   * @returns Complete URL with query parameter
   */
  logoDevSearch: (query: string) => `${API_ENDPOINTS.LOGO_DEV_SEARCH}?q=${encodeURIComponent(query)}`,
} as const