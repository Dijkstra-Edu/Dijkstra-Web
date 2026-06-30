import { Fellowship, JobPosition } from "@/types/client/opportunities/opportunities-types"

export type PaginatedFellowships = {
    fellowships: FellowshipDto[],
    total: number,
}
export type FellowshipDto = {
  id: string;
  title?: string;
  organization: string;
  organization_logo:string;
  hero_image?: string;
  location?: string;
  location_type?: string;
  duration_weeks?: number;
  stipend_month?: number;
  stipend_currency?: string;
  application_deadline?: string;
  start_date?: string;
  description?: string;
  featured?: boolean;
  highlight?: string;
  category?: string;
  benefits?: string[];
  requirements?: string[];
  technologies?: string[];
  application_url?: string;
  created_at: string;
  updated_at: string;
};

export type FellowshipsFilterHelpersResponseDto = {
    locationTypes: string[],
    categories: string[],
    durations: string[],
    organizations: string[]
}

export type FellowshipsFilterHelpers = {
    locationTypes: Fellowship["locationType"][],
    categories: string[],
    durations: string[],
    organizations: string[]
}