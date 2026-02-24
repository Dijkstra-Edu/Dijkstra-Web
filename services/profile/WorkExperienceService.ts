import {
  transformWorkExperience,
  transformWorkExperienceArray,
  transformWorkExperienceToRequest,
  transformWorkExperienceUpdateRequest,
} from "./transformers/transformers";
import { WorkExperienceData } from "@/types/client/profile-section/profile-sections";
import { GetWorkExperienceResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/wp";

/**
 * Get Work Experience by GitHub username
 */
export async function getWorkExperienceByGithubUsername(
  username: string
): Promise<WorkExperienceData[]> {
  const response = await apiCall<GetWorkExperienceResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformWorkExperienceArray(response);
}

/**
 * Add Work Experience by GitHub username
 */
export async function addWorkExperienceByGithubUsername(
  data: Omit<WorkExperienceData, "id" | "createdAt" | "updatedAt">
): Promise<WorkExperienceData> {
  const request = transformWorkExperienceToRequest(data);
  const response = await apiCall<GetWorkExperienceResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformWorkExperience(response);
}

/**
 * Update Work Experience by Work Experience ID
 */
export async function updateWorkExperienceByWorkExperienceId(
  workExperienceId: string,
  data: Partial<WorkExperienceData>
): Promise<WorkExperienceData> {
  const request = transformWorkExperienceUpdateRequest(data);
  const response = await apiCall<GetWorkExperienceResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(workExperienceId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformWorkExperience(response);
}

/**
 * Delete Work Experience by Work Experience ID
 */
export async function deleteWorkExperienceByWorkExperienceId(
  workExperienceId: string
): Promise<void> {
  await apiCall<void>("dataforge", `${WP_PATH}/${encodeURIComponent(workExperienceId)}`, {
    method: "DELETE",
  });
}
