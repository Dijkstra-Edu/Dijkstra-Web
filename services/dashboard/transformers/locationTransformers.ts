/** Raw Nominatim search API item */

import { LocationSearchResult, NominatimResultItem } from "@/types/client/dashboard/location";

export function transformNominatimResponse(data: unknown): LocationSearchResult[] {
  if (!Array.isArray(data)) return [];
  return data.map((item: NominatimResultItem) => {
    const address = item.address ?? {};
    const city =
      address.city ?? address.town ?? address.village ?? address.hamlet ?? "";
    const state = address.state ?? address.province ?? address.county;
    const country = address.country ?? "";
    const latitude = item.lat ? parseFloat(item.lat) : undefined;
    const longitude = item.lon ? parseFloat(item.lon) : undefined;
    return {
      city,
      state,
      country,
      latitude,
      longitude,
    };
  });
}
