import { JobPosition } from "@/types/client/opportunities/opportunities-types"

export type PaginatedJobPosition = {
    jobs: JobPositionDto[],
    total: number,
}
export type JobPositionDto = {
    id: string,
    title?: string,
    department?: string,
    company_name?: string,
    company_logo?: string,
    hero_image?: string,
    location?: string,
    location_type?: string,
    employment_type?: string,
    experience_level?: string,
    experience_yoe?: number,
    posted_date?: string,
    salary_annual_min?: number,
    salary_annual_max?: number,
    salary_currency?: string,
    description?: string,
    featured?: boolean,
    highlight?: string,
    category?: string,
    perks?: string[],
    organization: string,
    createdAt: string,
    updatedAt: string,
    technologies?: string[]
}

export type JobFilterHelpersResponseDto = {
    locations: string[],
    locationTypes: string[],
    departments: string[],
    employmentTypes: string[],
    categories: string[],
    organizations: string[],
    experienceLevels: string[],
}

export type JobFilterHelpers = {
    locations: string[],
    locationTypes: JobPosition["locationType"][],
    departments: string[],
    employmentTypes: JobPosition["employmentType"][],
    categories: string[],
    organizations: string[],
    experienceLevels: JobPosition["experienceLevel"][],
}