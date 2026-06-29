import { apiCall } from "../CoreApiService";
import { Fellowship, JobPosition } from "@/types/client/opportunities/opportunities-types";
import { buildPathWithParams } from "@/lib/utils";
import { FellowshipDto, FellowshipsFilterHelpers, FellowshipsFilterHelpersResponseDto, PaginatedFellowships } from "@/types/server/dataforge/Fellowship/fellowship";

export async function getFellowships(params: Map<string, string>): Promise<[Fellowship[], number]> {
  const path = buildPathWithParams(`Dijkstra/v1/fellowships/`, params);
  console.log("Fetching fellowship listings:", path);
  const raw = await apiCall<PaginatedFellowships>("dataforge", path);
  const result = raw.fellowships.map(convertToFellowships);
  console.log("Fetched fellowship listings:", result);
  return [result, raw.total];
}

export async function getFellowshipFilterHelpers(): Promise<FellowshipsFilterHelpers> {
  const path = `Dijkstra/v1/fellowships/filter_helpers`;
  console.log("Fetching job filter helpers:", path);
  const raw = await apiCall<FellowshipsFilterHelpersResponseDto>("dataforge", path);
  const result = convertToFilterHelpers(raw);
  console.log("Fetched fellowships filter helpers:", result);
  return result;
}

const convertToFilterHelpers = (response: FellowshipsFilterHelpersResponseDto): FellowshipsFilterHelpers => {
    return {
        locationTypes: response.locationTypes.map(formatLocationType),
        durations: response.durations,
        organizations: response.organizations,
        categories: response.categories,
       
    }
}


const formatLocationType = (locationType?: string): Fellowship["locationType"] => {
     return (locationType === "REMOTE" ||
      locationType === "HYBRID")? locationType.toLocaleLowerCase() as JobPosition["locationType"] : "onsite"
}

const convertToFellowships = (fellowship: FellowshipDto): Fellowship => {
  return {
  id: fellowship.id,
  title: fellowship.title ?? "",
  organization: fellowship.organization ?? "",
  organizationLogo: fellowship.organization_logo ?? "",
  heroImage: fellowship.hero_image ?? "",
  description: fellowship.description ?? "",
  featured: fellowship.featured ?? false,
  highlight: fellowship.highlight === "new" ||
    fellowship.highlight === "trending" ||
    fellowship.highlight === "competitive" ||
    fellowship.highlight === "popular"
    ? fellowship.highlight
    : undefined,

  category: fellowship.category ?? "",
  location: fellowship.location ?? "",
  locationType: formatLocationType(fellowship.location_type),
  duration: fellowship.duration_weeks?.toString() ?? "0",
  stipend: fellowship.stipend_month?.toString() ?? "0",
  applicationDeadline: fellowship.application_deadline ?? "",
  startDate: fellowship.start_date ?? "",
  benefits: fellowship.benefits ?? [],
  requirements: fellowship.requirements ?? [],
  technologies: fellowship.technologies ?? [],
};
};