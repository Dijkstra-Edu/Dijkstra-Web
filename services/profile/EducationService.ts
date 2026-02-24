import {
  transformEducation,
  transformEducationArray,
  transformEducationToRequest,
  transformEducationUpdateRequest,
} from "./transformers/transformers";
import { EducationData } from "@/types/client/profile-section/profile-sections";
import { GetEducationResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/education";

/**
 * Get Education by GitHub username
 */
export async function getEducationByGithubUsername(
  username: string
): Promise<EducationData[]> {
  const response = await apiCall<GetEducationResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformEducationArray(response);
}

/**
 * Add Education by GitHub username
 */
export async function addEducationByGithubUsername(
  data: Omit<EducationData, "id" | "createdAt" | "updatedAt">
): Promise<EducationData> {
  const request = transformEducationToRequest(data);
  const response = await apiCall<GetEducationResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformEducation(response);
}

/**
 * Update Education by Education ID
 */
export async function updateEducationByEducationId(
  educationId: string,
  data: Partial<EducationData>
): Promise<EducationData> {
  const request = transformEducationUpdateRequest(data);
  const response = await apiCall<GetEducationResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(educationId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformEducation(response);
}

/**
 * Delete Education by Education ID
 */
export async function deleteEducationByEducationId(
  educationId: string
): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(educationId)}`,
    {
      method: "DELETE",
    }
  );
}
