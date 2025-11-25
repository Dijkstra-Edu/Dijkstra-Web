import { Rank, Tools, Domain } from "@/types/server/dataforge/enums";
import { fetchDataForge } from "../client";
import { GetUserSideCardResponse } from "@/types/server/dataforge/User/user";
import { 
  transformPersonalDetails, 
  transformPersonalDetailsUpdateRequest, 
  transformWorkExperience, 
  transformWorkExperienceArray, 
  transformWorkExperienceToRequest, 
  transformWorkExperienceUpdateRequest,
  transformEducation,
  transformEducationArray,
  transformEducationToRequest,
  transformEducationUpdateRequest,
  transformCertifications,
  transformCertificationsArray,
  transformCertificationsToRequest,
  transformCertificationsUpdateRequest,
  transformPublications,
  transformPublicationsArray,
  transformPublicationsToRequest,
  transformPublicationsUpdateRequest,
  transformTestScores,
  transformTestScoresArray,
  transformTestScoresToRequest,
  transformTestScoresUpdateRequest
} from "@/types/server/dataforge/transformers";
import { PersonalDetailsData, WorkExperienceData, EducationData, CertificationsData, PublicationsData, TestScoresData } from "@/types/client/profile-section/profile-sections";
import { GetPersonalDetailsResponse, GetWorkExperienceResponse, GetEducationResponse, GetCertificationsResponse, GetPublicationsResponse, GetTestScoresResponse } from "@/types/server/dataforge/User/profile";

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
    access_token?: string;
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
    console.log("Access Token in submitOnboarding:", data.access_token);
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
  export async function addWorkExperienceByGithubUsername( data: Omit<WorkExperienceData, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkExperienceData> {
    console.log('Adding work experience data', data);
    const request = transformWorkExperienceToRequest(data);
    const response = await fetchDataForge<GetWorkExperienceResponse>(
      `/Dijkstra/v1/wp/`, {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    return transformWorkExperience(response);
  }

  /**
   * Update Work Experience by Work Experience ID
   */
  export async function updateWorkExperienceByWorkExperienceId(workExperienceId: string, data: Partial<WorkExperienceData>): Promise<WorkExperienceData> {
    const request = transformWorkExperienceUpdateRequest(data);
    const response = await fetchDataForge<GetWorkExperienceResponse>(
      `/Dijkstra/v1/wp/${encodeURIComponent(workExperienceId)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
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

  /**
   * Get Education by GitHub username
   */
  export async function getEducationByGithubUsername(username: string): Promise<EducationData[]> {
    const response = await fetchDataForge<GetEducationResponse[]>(
      `/Dijkstra/v1/education/${encodeURIComponent(username)}`
    );
    return transformEducationArray(response);
  }

  /**
   * Add Education by GitHub username
   */
  export async function addEducationByGithubUsername( data: Omit<EducationData, 'id' | 'createdAt' | 'updatedAt'>): Promise<EducationData> {
    console.log('Adding education data', data);
    const request = transformEducationToRequest(data);
    console.log('Request', request);
    const response = await fetchDataForge<GetEducationResponse>(
      `/Dijkstra/v1/education/`, {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    return transformEducation(response);
  }

  /**
   * Update Education by Education ID
   */
  export async function updateEducationByEducationId(educationId: string, data: Partial<EducationData>): Promise<EducationData> {
    const request = transformEducationUpdateRequest(data);
    const response = await fetchDataForge<GetEducationResponse>(
      `/Dijkstra/v1/education/${encodeURIComponent(educationId)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      }
    );
    return transformEducation(response);
  }

  /**
   * Delete Education by Education ID
   */
  export async function deleteEducationByEducationId(educationId: string): Promise<void> {
    await fetchDataForge<void>(
      `/Dijkstra/v1/education/${encodeURIComponent(educationId)}`, {
        method: 'DELETE',
      }
    );
  }

  export async function getCertificationsByGithubUsername(username: string): Promise<CertificationsData[]> {
    const response = await fetchDataForge<GetCertificationsResponse[]>(
      `/Dijkstra/v1/certifications/${encodeURIComponent(username)}`
    );
    return transformCertificationsArray(response);
  }

    export async function addCertificationsByGithubUsername( data: Omit<CertificationsData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CertificationsData> {
    console.log('Adding certification data', data);
    const request = transformCertificationsToRequest(data);
    console.log('Request', request);
    const response = await fetchDataForge<GetCertificationsResponse>(
      `/Dijkstra/v1/certifications/`, {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    return transformCertifications(response);
  }



  export async function updateCertificationsByCertificationId(certificationId: string, data: Partial<CertificationsData>): Promise<CertificationsData> {
    const request = transformCertificationsUpdateRequest(data);
    const response = await fetchDataForge<GetCertificationsResponse>(
      `/Dijkstra/v1/certifications/${encodeURIComponent(certificationId)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      }
    );
    return transformCertifications(response);
  } 

  export async function deleteCertificationsByCertificationId(certificationId: string): Promise<void> {
    await fetchDataForge<void>(
      `/Dijkstra/v1/certifications/${encodeURIComponent(certificationId)}`, {
        method: 'DELETE',
      }
    );
  } 



export async function getPublicationsByGithubUsername(username: string): Promise<PublicationsData[]> {
        const response = await fetchDataForge<GetPublicationsResponse[]>(
      `/Dijkstra/v1/publications/${encodeURIComponent(username)}`
    );
    return transformPublicationsArray(response);
    }

  /**
   * Add Publication by GitHub username
   */
  export async function addPublicationsByGithubUsername( data: Omit<PublicationsData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PublicationsData> {
    console.log('Adding publication data', data);
    const request = transformPublicationsToRequest(data);
    console.log('Request', request);
    const response = await fetchDataForge<GetPublicationsResponse>(
      `/Dijkstra/v1/publications/`, {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    return transformPublications(response);
  }

  /**
   * Update Publication by Publication ID
   */
  export async function updatePublicationsByPublicationId(publicationId: string, data: Partial<PublicationsData>): Promise<PublicationsData> {
    const request = transformPublicationsUpdateRequest(data);
    const response = await fetchDataForge<GetPublicationsResponse>(
      `/Dijkstra/v1/publications/${encodeURIComponent(publicationId)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      }
    );
    return transformPublications(response);
  } 

  /**
   * Delete Publication by Publication ID
   */
  export async function deletePublicationsByPublicationId(publicationId: string): Promise<void> {
    await fetchDataForge<void>(
      `/Dijkstra/v1/publications/${encodeURIComponent(publicationId)}`, {
        method: 'DELETE',
      }
    );
  }

  /**
   * Get Test Scores by GitHub username
   */
  export async function getTestScoresByGithubUsername(username: string): Promise<TestScoresData[]> {
    const response = await fetchDataForge<GetTestScoresResponse[]>(
      `/Dijkstra/v1/test-scores/${encodeURIComponent(username)}`
    );
    return transformTestScoresArray(response);
  }

  /**
   * Add Test Score by GitHub username
   */
  export async function addTestScoresByGithubUsername( data: Omit<TestScoresData, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestScoresData> {
    console.log('Adding test score data', data);
    const request = transformTestScoresToRequest(data);
    console.log('Request', request);
    const response = await fetchDataForge<GetTestScoresResponse>(
      `/Dijkstra/v1/test-scores/`, {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    return transformTestScores(response);
  }

  /**
   * Update Test Score by Test Score ID
   */
  export async function updateTestScoresByTestScoreId(testScoreId: string, data: Partial<TestScoresData>): Promise<TestScoresData> {
    const request = transformTestScoresUpdateRequest(data);
    const response = await fetchDataForge<GetTestScoresResponse>(
      `/Dijkstra/v1/test-scores/${encodeURIComponent(testScoreId)}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      }
    );
    return transformTestScores(response);
  } 

  /**
   * Delete Test Score by Test Score ID
   */
  export async function deleteTestScoresByTestScoreId(testScoreId: string): Promise<void> {
    await fetchDataForge<void>(
      `/Dijkstra/v1/test-scores/${encodeURIComponent(testScoreId)}`, {
        method: 'DELETE',
      }
    );
  }
