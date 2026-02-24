import { NextRequest } from "next/server"
import { getLogoDevBaseUrl, getNominatimBaseUrl } from "@/lib/base-urls-keys"

/**
 * Configuration for an external API proxied via /api/<service>/<path>.
 * Add entries here to expose new external services through the generic handler.
 */
export interface ExternalServiceConfig {
  /** Returns the origin/base URL (no trailing path). */
  getBaseUrl: () => string
  /**
   * Optional headers for the upstream request.
   * Use a function to read env at request time (e.g. API keys).
   */
  getHeaders?: (req: NextRequest) => Record<string, string>
  /** Next.js fetch cache: revalidate after this many seconds. Omit for no-store. */
  revalidate?: number
  /** Optional: throw if env or config is invalid (e.g. missing API key). Used to return 500 before calling upstream. */
  validate?: () => void
}

function logoDevHeaders(): Record<string, string> {
  const apiKey = process.env.LOGODEV_API_KEY
  if (!apiKey) return {}
  return {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  }
}

/**
 * Registry of external services. Keys are the first path segment (e.g. "logo-dev", "nominatim").
 * Add new APIs here to expose them via GET /api/<key>/<path>.
 */
export const EXTERNAL_SERVICES: Record<string, ExternalServiceConfig> = {
  "logo-dev": {
    getBaseUrl: () => getLogoDevBaseUrl().replace(/\/+$/, ""),
    getHeaders: logoDevHeaders,
    revalidate: 60,
    validate: () => {
      if (!process.env.LOGODEV_API_KEY) throw new Error("Missing LOGODEV_API_KEY")
    },
  },
  nominatim: {
    getBaseUrl: () => getNominatimBaseUrl().replace(/\/+$/, ""),
    getHeaders: () => ({ "User-Agent": "Dijkstra-Web/1.0" }),
    revalidate: 60,
  },
}

export function getExternalServiceConfig(service: string): ExternalServiceConfig | null {
  return EXTERNAL_SERVICES[service] ?? null
}

export function isExternalServiceKey(service: string): boolean {
  return service in EXTERNAL_SERVICES
}
