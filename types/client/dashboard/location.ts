export interface NominatimResultItem {
    lat?: string;
    lon?: string;
    address?: {
      city?: string;
      town?: string;
      village?: string;
      hamlet?: string;
      state?: string;
      province?: string;
      county?: string;
      country?: string;
    };
  }
  
  export interface LocationSearchResult {
    city: string;
    state?: string;
    country: string;
    latitude?: number;
    longitude?: number;
  }