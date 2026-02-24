import {
  transformVolunteering,
  transformVolunteeringArray,
  transformVolunteeringToRequest,
  transformVolunteeringUpdateRequest,
} from "./transformers/transformers";
import { VolunteeringData } from "@/types/client/profile-section/profile-sections";
import { GetVolunteeringResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/volunteering";

/**
 * Get Volunteering by GitHub username
 */
export async function getVolunteeringByGithubUsername(
  username: string
): Promise<VolunteeringData[]> {
  const response = await apiCall<GetVolunteeringResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformVolunteeringArray(response);
}

/**
 * Add Volunteering by GitHub username
 */
export async function addVolunteeringByGithubUsername(
  data: Omit<VolunteeringData, "id" | "createdAt" | "updatedAt">
): Promise<VolunteeringData> {
  const request = transformVolunteeringToRequest(data);
  const response = await apiCall<GetVolunteeringResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformVolunteering(response);
}

/**
 * Update Volunteering by Volunteering ID
 */
export async function updateVolunteeringByVolunteeringId(
  volunteeringId: string,
  data: Partial<VolunteeringData>
): Promise<VolunteeringData> {
  const request = transformVolunteeringUpdateRequest(data);
  const response = await apiCall<GetVolunteeringResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(volunteeringId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformVolunteering(response);
}

/**
 * Delete Volunteering by Volunteering ID
 */
export async function deleteVolunteeringByVolunteeringId(
  volunteeringId: string
): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(volunteeringId)}`,
    {
      method: "DELETE",
    }
  );
}
