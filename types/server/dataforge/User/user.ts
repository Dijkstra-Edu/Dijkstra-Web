// TypeScript types for User API endpoints matching database schema

import { Rank, Domain, Tools } from "../enums";

export interface OnboardUserRequest {
  // Required fields
  github_user_name: string;
  linkedin_user_name: string;
  leetcode_user_name: string;
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  selectedTools: Tools[];
  dreamCompany: string;
  dreamRole: string;
  
  // Optional fields
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  rank?: Rank;
  streak?: number;
}

export interface OnboardUserResponse {
  id: string;
  github_user_name: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  rank: Rank;
  streak: number;
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  selectedTools: Tools[];
  dreamCompany: string;
  dreamRole: string;
  onboarding_complete: boolean;
  data_loaded: boolean;
  created_at: string;
  updated_at: string;
}

export interface CheckOnboardingStatusResponse {
  onboarded: boolean;
  user_id: string | null;
}

export interface GetUserBasicResponse {
  id: string;
  github_user_name: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  rank: Rank;
  streak: number | null;
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  onboarding_complete: boolean;
  data_loaded: boolean;
  created_at: string;
  updated_at: string;
}

