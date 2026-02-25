// All API calls that are made through this service

// Calls can be made to the following APIs:
// - Dataforge
// - Gitripper
// - Helios
// - Archivist
// - 3rd Party API's - These cases are handled sepereately

/** Error shape returned by the generic API route and backends */
export interface ApiErrorBody {
  error?: string;
  message?: string;
  details?: string;
}

/**
 * Service keys that the API route uses to resolve the backend base URL.
 * Must match the keys in app/api/[...path]/route.ts (dataforge, gitripper, helios, archivist).
 */
export type ApiServiceKey = "dataforge" | "gitripper" | "helios" | "archivist" | "logo-dev" | "nominatim" | "gemini";

/**
 * Generic client that calls the Next.js API route at /api/[...path], which proxies
 * to the backend for the given service. The route uses the first path segment (service)
 * to resolve the backend base URL.
 *
 * @param service - Which backend to call (dataforge, gitripper, helios, archivist)
 * @param path - Backend path as string (e.g. "Dijkstra/v1/wp/username") or segments (e.g. ["Dijkstra", "v1", "wp", id])
 * @param init - Standard fetch RequestInit (method, body, headers)
 * @returns Parsed JSON response as T
 * @throws Error with message from backend or API route on failure
 */
export async function apiCall<T = unknown>(
  service: ApiServiceKey,
  path: string | string[],
  init?: RequestInit
): Promise<T> {
  const pathStr =
    typeof path === "string"
      ? path.replace(/^\/+|\/+$/g, "")
      : path.map((s) => String(s).replace(/^\/+|\/+$/g, "")).join("/");
  const fullPath = `${service}/${pathStr}`;
  const url = `/api/${fullPath}`;
  const method = init?.method ?? "GET";

  const response = await fetch(url, {
    ...init,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "same-origin",
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const raw = await response.text();
  const data = isJson ? (raw ? JSON.parse(raw) : null) : raw;

  if (!response.ok) {
    const errBody = (isJson ? data : { message: raw }) as ApiErrorBody;
    const message =
      errBody?.message ?? errBody?.error ?? `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return data as T;
}