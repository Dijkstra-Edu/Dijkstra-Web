import { Rank, Tools, Domain } from "@/types/server/dataforge/enums";
import { fetchDataForge } from "../client";
import { GetUserSideCardResponse } from "@/types/server/dataforge/User/user";
import { GetPersonalDetailsResponse, GetWorkExperienceResponse } from "@/types/server/dataforge/User/profile";
import { PersonalDetailsData, WorkExperienceData } from "@/types/client/profile-section/profile-sections";
import { transformPersonalDetails, transformPersonalDetailsUpdateRequest, transformWorkExperience, transformWorkExperienceArray } from "@/types/server/dataforge/transformers";

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

  export interface GetAuthDataResponse {
    user_id: string;
    profile_id: string;
    github_user_name: string;
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
  export async function getPersonalDetailsByGithubUsername(username: string): Promise<PersonalDetailsData> {
    console.log(`Getting personal details for ${username}`);
    const response = await fetchDataForge<GetPersonalDetailsResponse>(
      `/Dijkstra/v1/u/personal-details/${encodeURIComponent(username)}`
    );
    return transformPersonalDetails(response);
  }

  /**
   * Update Personal Details by GitHub username
   */
  export async function updatePersonalDetailsByGithubUsername(username: string, data: Partial<PersonalDetailsData>): Promise<PersonalDetailsData> {
    const request = transformPersonalDetailsUpdateRequest(data);
    const response = await fetchDataForge<GetPersonalDetailsResponse>(
      `/Dijkstra/v1/u/personal-details/${encodeURIComponent(username)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      }
    );
    return transformPersonalDetails(response);
  }

  /**
 * Get Auth Data by GitHub username
 */
  export async function getAuthDataByGithubUsername(username: string): Promise<GetAuthDataResponse> {
    return fetchDataForge<GetAuthDataResponse>(
      `/Dijkstra/v1/u/auth/${encodeURIComponent(username)}`
    );
  }

  /**
   * Get Work Experience by GitHub username
   */
  export async function getWorkExperienceByGithubUsername(username: string): Promise<WorkExperienceData[]> {
    const response = await fetchDataForge<GetWorkExperienceResponse[]>(
      `/Dijkstra/v1/wp/${encodeURIComponent(username)}`
    );
    return transformWorkExperienceArray(response);
  }

  /**
   * Add Work Experience by GitHub username
   */
  export async function addWorkExperienceByGithubUsername(username: string, data: Omit<WorkExperienceData, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkExperienceData> {
    const response = await fetchDataForge<GetWorkExperienceResponse>(
      `/Dijkstra/v1/wp/`, {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return transformWorkExperience(response);
  }

  /**
   * Update Work Experience by Work Experience ID
   */
  export async function updateWorkExperienceByWorkExperienceId(workExperienceId: string, data: Partial<WorkExperienceData>): Promise<WorkExperienceData> {
    const response = await fetchDataForge<GetWorkExperienceResponse>(
      `/Dijkstra/v1/wp/${encodeURIComponent(workExperienceId)}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
    return transformWorkExperience(response);
  }
  
  /**
   * Delete Work Experience by Work Experience ID
   */
  export async function deleteWorkExperienceByWorkExperienceId(workExperienceId: string): Promise<void> {
    await fetchDataForge<void>(
      `/Dijkstra/v1/wp/${encodeURIComponent(workExperienceId)}`, {
        method: 'DELETE',
      }
    );
  }