/**
 * Complete User Profile Types for Resume Builder
 * These types match the full API response from GET /Dijkstra/v1/u/{github_username}?all_data=true
 */

import { UUID } from "crypto";
import { Domain, EmploymentType, Rank, Tools, WorkLocationType, SchoolType, Degree, CertificationType, Cause } from "../enums";

// ============================================
// Location Types
// ============================================
export interface LocationResponse {
  id: UUID;
  city: string;
  state?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// ============================================
// Links Types
// ============================================
export interface LinksResponse {
  portfolio_link?: string;
  github_user_name: string;
  github_link?: string;
  linkedin_user_name?: string;
  linkedin_link?: string;
  leetcode_user_name?: string;
  leetcode_link?: string;
  orcid_id?: string;
  orcid_link?: string;
  primary_email?: string;
  secondary_email?: string;
  school_email?: string;
  work_email?: string;
}

// ============================================
// Education Types
// ============================================
export interface EducationResponse {
  id: UUID;
  profile_id: UUID;
  school_name: string;
  school_logo_url?: string;
  school_type: SchoolType;
  degree: Degree;
  course_field_name: string;
  currently_studying: boolean;
  location?: LocationResponse;
  location_type: WorkLocationType;
  start_date_month: number;
  start_date_year: number;
  end_date_month?: number;
  end_date_year?: number;
  description_general: string;
  description_detailed?: string;
  description_less?: string;
  work_done?: string;
  cgpa?: number;
  school_score_multiplier?: number;
  tools_used?: Tools[];
}

// ============================================
// Work Experience Types
// ============================================
export interface WorkExperienceResponse {
  id: UUID;
  profile_id: UUID;
  title: string;
  employment_type: EmploymentType;
  domain?: Domain[];
  company_name: string;
  company_logo?: string;
  currently_working: boolean;
  location?: LocationResponse;
  location_type: WorkLocationType;
  start_date_month: number;
  start_date_year: number;
  end_date_month?: number;
  end_date_year?: number;
  description_general: string;
  description_detailed?: string;
  description_less?: string;
  work_done?: string;
  company_score?: number;
  time_spent_multiplier?: number;
  work_done_multiplier?: number;
  tools_used?: Tools[];
}

// ============================================
// Certifications Types
// ============================================
export interface CertificationResponse {
  id: UUID;
  profile_id: UUID;
  name: string;
  type: CertificationType;
  issuing_organization: string;
  issuing_organization_logo?: string;
  issue_date: string; // ISO date string
  expiry_date?: string; // ISO date string
  credential_id: string;
  credential_url: string;
  tools?: Tools[];
}

// ============================================
// Publications Types
// ============================================
export interface PublicationResponse {
  id: UUID;
  profile_id: UUID;
  title: string;
  publisher: string;
  publisher_logo?: string;
  authors: string[];
  publication_date: string; // ISO date string
  publication_url: string;
  description: string;
  tools?: Tools[];
}

// ============================================
// Volunteering Types
// ============================================
export interface VolunteeringResponse {
  id: UUID;
  profile_id: UUID;
  organization: string;
  organization_logo?: string;
  role: string;
  cause: Cause;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string
  currently_volunteering: boolean;
  description?: string;
  tools?: Tools[];
}

// ============================================
// Projects Types
// ============================================
export interface ProjectResponse {
  id: UUID;
  profile_id: UUID;
  name: string;
  organization?: string;
  project_organization_logo?: string;
  owner: string; // GitHub username
  private: boolean;
  github_stars: number;
  github_about?: string;
  github_open_issues: number;
  github_forks: number;
  description: string;
  domain: Domain;
  topics: string[];
  tools: Tools[];
  readme: boolean;
  license: boolean;
  landing_page: boolean;
  landing_page_link?: string;
  docs_page: boolean;
  docs_page_link?: string;
  own_domain_name: boolean;
  domain_name?: string;
  total_lines_contributed?: number;
  improper_uploads?: boolean;
  complexity_rating?: number;
  testing_framework_present: boolean;
  testing_framework?: string;
}

// ============================================
// LeetCode Types (currently null in API)
// ============================================
export interface LeetCodeResponse {
  username?: string;
  total_solved?: number;
  easy_solved?: number;
  medium_solved?: number;
  hard_solved?: number;
  ranking?: number;
}

// ============================================
// Profile Container Type
// ============================================
export interface ProfileResponse {
  education: EducationResponse[];
  work_experience: WorkExperienceResponse[];
  certifications: CertificationResponse[];
  publications: PublicationResponse[];
  volunteering: VolunteeringResponse[];
  projects: ProjectResponse[];
  leetcode?: LeetCodeResponse | null;
}

// ============================================
// Full User Profile Response
// ============================================
export interface GetFullUserProfileResponse {
  // User basic info
  id: UUID;
  github_user_name: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  rank: Rank;
  streak?: number;
  
  // Bio and location
  bio?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  location_latitude?: number;
  location_longitude?: number;
  
  // Specialization and career goals
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  tools_to_learn?: Tools[];
  dream_company?: string;
  dream_company_logo?: string;
  dream_position?: string;
  
  // Status flags
  onboarding_complete: boolean;
  onboarding_journey_completed: boolean;
  data_loaded: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Nested data
  links: LinksResponse;
  profile: ProfileResponse;
}
