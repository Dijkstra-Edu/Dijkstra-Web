import { JobFilterHelpers, JobFilterHelpersResponseDto, JobPositionDto, PaginatedJobPosition } from "@/types/server/dataforge/Job/job";
import { apiCall } from "../CoreApiService";
import { JobPosition } from "@/types/client/opportunities/opportunities-types";
import { buildPathWithParams } from "@/lib/utils";

export async function getJobListings(params: Map<string, string>): Promise<[JobPosition[], number]> {
  const path = buildPathWithParams(`Dijkstra/v1/jobs/`, params);
  console.log("Fetching job listings:", path);
  const raw = await apiCall<PaginatedJobPosition>("dataforge", path);
  const result = raw.jobs.map(convertToJobPosition);
  console.log("Fetched job listings:", result);
  return [result, raw.total];
}

export async function getJobFilterHelpers(): Promise<JobFilterHelpersResponseDto> {
  const path = `Dijkstra/v1/jobs/filter_helpers`;
  console.log("Fetching job filter helpers:", path);
  const raw = await apiCall<JobFilterHelpersResponseDto>("dataforge", path);
  const result = convertToFilterHelpers(raw);
  console.log("Fetched job filter helpers:", result);
  return result;
}

const convertToFilterHelpers = (response: JobFilterHelpersResponseDto): JobFilterHelpers => {
    return {
        locations: response.locations,
        locationTypes: response.locationTypes.map(formatLocationType),
        departments: response.departments,
        employmentTypes: response.employmentTypes.map(formatEmploymentType),
        categories: response.categories,
        organizations: response.organizations,
        experienceLevels: response.experienceLevels.map(formatExperienceLevel),
    }
}

const formatSalary = (
  salaryAnnualMin?: number,
  salaryAnnualMax?: number,
  salaryCurrency?: string
): string => {
  if (!salaryAnnualMin && !salaryAnnualMax) {
    return "Salary not specified";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: salaryCurrency ? "currency" : "decimal",
    currency: salaryCurrency || undefined,
    maximumFractionDigits: 0,
  });

  if (salaryAnnualMin && salaryAnnualMax) {
    return `${formatter.format(salaryAnnualMin)} - ${formatter.format(salaryAnnualMax)} / year`;
  }

  if (salaryAnnualMin) {
    return `From ${formatter.format(salaryAnnualMin)} / year`;
  }

  return `Up to ${formatter.format(salaryAnnualMax!)} / year`;
};

const formatLocationType = (locationType?: string): JobPosition["locationType"] => {
     return (locationType === "REMOTE" ||
      locationType === "ON_SITE" ||
      locationType === "HYBRID")? locationType.toLocaleLowerCase() as JobPosition["locationType"] : "onsite"
}

const formatEmploymentType = (employmentType?: string): JobPosition["employmentType"] => {
  return (employmentType === "FULL_TIME" ||
      employmentType === "PART_TIME" ||
      employmentType === "CONTRACT" ||
      employmentType === "INTERNSHIP")? employmentType.toLocaleLowerCase().replace("_", "-") as JobPosition["employmentType"] : "full-time"
}

const formatExperienceLevel = (experienceLevel?: string): JobPosition["experienceLevel"] => {
    return experienceLevel as JobPosition["experienceLevel"] || "entry"
}

const convertToJobPosition = (job: JobPositionDto): JobPosition => {
  return {
    id: job.id,
    title: job.title ?? "",
    organization: job.company_name ?? "",
    organizationLogo: job.company_logo ?? "",
    heroImage: job.hero_image ?? "",
    description: job.description ?? "",
    featured: job.featured ?? false,

    highlight:
      job.highlight === "new" ||
      job.highlight === "trending" ||
      job.highlight === "competitive" ||
      job.highlight === "popular"
        ? job.highlight
        : undefined,

    category: job.category ?? "",

    department: job.department ?? "",
    companyName: job.company_name ?? "",
    location: job.location ?? "",

    locationType: formatLocationType(job.location_type),
    employmentType: formatEmploymentType(job.employment_type),
    experienceLevel: formatExperienceLevel(job.experience_level),

    postedDate: job.posted_date ?? "",

    salary: formatSalary(
      job.salary_annual_min,
      job.salary_annual_max,
      job.salary_currency
    ),

    perks: job.perks ?? [],
  };
};