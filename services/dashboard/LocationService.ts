import { apiCall } from "@/services/CoreApiService";
import { transformNominatimResponse } from "@/services/dashboard/transformers/locationTransformers";
import { LocationSearchResult, NominatimResultItem } from "@/types/client/dashboard/location";

/**
 * Search locations via Nominatim API through the generic API proxy.
 * Uses GET /api/nominatim/search?q=...&format=json&addressdetails=1&limit=5
 */
export async function searchLocations(query: string): Promise<LocationSearchResult[]> {
  const trimmed = query?.trim();
  if (!trimmed) {
    return [];
  }
  const params = new URLSearchParams({
    q: trimmed,
    format: "json",
    addressdetails: "1",
    limit: "5",
  });
  const path = `search?${params.toString()}`;
  const data = await apiCall<NominatimResultItem[]>("nominatim", path);
  return transformNominatimResponse(data);
}
