import { UUID } from "crypto"
import { Domain, Rank, Tools } from "../enums"

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