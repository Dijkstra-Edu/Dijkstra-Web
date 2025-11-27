import { UUID } from "crypto"
import { Degree, Domain, EmploymentType, Rank, SchoolType, Tools, WorkLocationType  , CertificationType, TestScoreType} from "../enums"

export interface GetLocationResponse {
    id: UUID
    city: string
    state: string
    country: string    
    latitude: number
    longitude: number
}

export interface GetPersonalDetailsResponse {
    first_name?: string
    middle_name?: string
    last_name?: string
    bio?: string
    location_city?: string
    location_state?: string
    location_country?: string
    location_latitude?: number
    location_longitude?: number
    primary_email?: string
    secondary_email?: string
    school_email?: string
    work_email?: string
    portfolio_link?: string
    github_user_name: string
    linkedin_user_name?: string
    leetcode_user_name?: string
    dream_company?: string
    dream_company_logo?: string
    dream_position?: string
    expected_salary_bucket: Rank
    time_left: number
    tools_to_learn?: Tools[]
    primary_specialization?: Domain
    secondary_specializations?: Domain[]
    rank: Rank
    streak?: number
    onboarding_complete: boolean
    onboarding_journey_completed: boolean
    data_loaded: boolean
  }

export interface UpdatePersonalDetailsRequest {
    first_name?: string
    middle_name?: string
    last_name?: string
    bio?: string
    location_city?: string
    location_state?: string
    location_country?: string
    location_latitude?: number
    location_longitude?: number
    primary_email?: string
    secondary_email?: string
    school_email?: string
    work_email?: string
    portfolio_link?: string
    linkedin_user_name?: string
    leetcode_user_name?: string
    dream_company?: string
    dream_company_logo?: string
    dream_position?: string
    expected_salary_bucket?: Rank
    time_left?: number
    tools_to_learn?: Tools[]
    primary_specialization?: Domain
    secondary_specializations?: Domain[]
}

export interface GetWorkExperienceResponse {
    id: UUID
    profile_id: UUID
    title: string
    employment_type: EmploymentType
    domain?: Domain[]
    company_name: string
    company_logo?: string
    currently_working: boolean
    location?: GetLocationResponse
    location_type: WorkLocationType
    start_date_month: number
    start_date_year: number
    end_date_month?: number
    end_date_year?: number
    description_general: string
    description_detailed?: string
    description_less?: string
    work_done?: string
    company_score?: number
    time_spent_multiplier?: number
    work_done_multiplier?: number
    tools_used?: Tools[]
}

export interface GetEducationResponse {
    id: UUID
    profile_id: UUID
    school_name: string
    school_logo_url?: string
    school_type: SchoolType
    degree: Degree
    course_field_name: string
    currently_studying: boolean
    location?: GetLocationResponse
    location_type: WorkLocationType
    start_date_month: number
    start_date_year: number
    end_date_month?: number
    end_date_year?: number
    description_general: string
    description_detailed?: string
    description_less?: string
    work_done?: string
    cgpa?: number
    tools_used?: Tools[]
}

export interface GetCertificationsResponse {
    id:string
    profile_id: UUID 
    name: string 
    type: CertificationType 
    issuing_organization: string 
    issue_date: string
    expiry_date?: string
    credential_id: string
    credential_url: string
    tools?: Tools[]
    issuing_organization_logo?: string
}

export interface GetPublicationsResponse {
    id: UUID
    profile_id: UUID
    title: string
    publisher: string
    authors: string[]
    publication_date: string
    publication_url: string
    description: string
    tools?: Tools[]
    publisher_logo?: string
    created_at: string
    updated_at: string
}

export interface GetTestScoresResponse {
    id: UUID
    profile_id: UUID
    title: string
    type: TestScoreType
    score: string
    test_date: string
    description?: string
    created_at: string
    updated_at: string
}