import { Rank, Tools, Domain } from "@/types/server/dataforge/enums";
import { fetchDataForge } from "../client";
import { GetUserSideCardResponse } from "@/types/server/dataforge/User/user";

export interface OnboardUserRequest {
    // Required fields
    github_user_name: string;
    linkedin_user_name: string;
    leetcode_user_name: string;
    primary_specialization: Domain;
    secondary_specializations: Domain[];
    expected_salary_bucket: Rank;
    time_left: number;
    primary_email: string;
    tools_to_learn: Tools[];
    dream_company: string;
    dream_position: string;
    
    // Optional fields
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    rank?: Rank;
    streak?: number;
    dream_company_logo?: string;
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


/**
 * Check onboarding status for a username
 */
export async function checkOnboardingStatus(username: string): Promise<CheckOnboardingStatusResponse> {
    return fetchDataForge<CheckOnboardingStatusResponse>(
      `/Dijkstra/v1/u/onboard?username=${encodeURIComponent(username)}`
    );
  }
  
  /**
   * Submit onboarding data
   */
  export async function submitOnboarding(data: OnboardUserRequest): Promise<OnboardUserResponse> {
    return fetchDataForge<OnboardUserResponse>('/Dijkstra/v1/u/onboard', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Get user data by GitHub username
   
  */
  export async function getUserByGithubUsername(username: string, allData: boolean = false): Promise<GetUserBasicResponse> {
    return fetchDataForge<GetUserBasicResponse>(
      `/Dijkstra/v1/u/${encodeURIComponent(username)}?all_data=${allData}`
    );
  }


  /**
   * Get Side Card Details by GitHub username
   */
  export async function getSideCardDetailsByGithubUsername(username: string): Promise<GetUserSideCardResponse> {
    return fetchDataForge<GetUserSideCardResponse>(
      `/Dijkstra/v1/u/card/${encodeURIComponent(username)}`
    );
  }

  /**
   * Get Personal Details by GitHub username
   */
  export async function getPersonalDetailsByGithubUsername(username: string, allData: boolean = false): Promise<GetUserBasicResponse> {
    return fetchDataForge<GetUserBasicResponse>(
      `/Dijkstra/v1/u/${encodeURIComponent(username)}?all_data=${allData}`
    );
  }

  /**
   * Update Personal Details by GitHub username
   */
  export async function updatePersonalDetailsByGithubUsername(username: string, allData: boolean = false): Promise<GetUserBasicResponse> {
    return fetchDataForge<GetUserBasicResponse>(
      `/Dijkstra/v1/u/${encodeURIComponent(username)}?all_data=${allData}`
    );
  }

  