import {
  transformPublications,
  transformPublicationsArray,
  transformPublicationsToRequest,
  transformPublicationsUpdateRequest,
} from "./transformers/transformers";
import { PublicationsData } from "@/types/client/profile-section/profile-sections";
import { GetPublicationsResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/publications";

/**
 * Get Publications by GitHub username
 */
export async function getPublicationsByGithubUsername(
  username: string
): Promise<PublicationsData[]> {
  const response = await apiCall<GetPublicationsResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformPublicationsArray(response);
}

/**
 * Add Publications by GitHub username
 */
export async function addPublicationsByGithubUsername(
  data: Omit<PublicationsData, "id" | "createdAt" | "updatedAt">
): Promise<PublicationsData> {
  const request = transformPublicationsToRequest(data);
  const response = await apiCall<GetPublicationsResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformPublications(response);
}

/**
 * Update Publications by Publication ID
 */
export async function updatePublicationsByPublicationId(
  publicationId: string,
  data: Partial<PublicationsData>
): Promise<PublicationsData> {
  const request = transformPublicationsUpdateRequest(data);
  const response = await apiCall<GetPublicationsResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(publicationId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformPublications(response);
}

/**
 * Delete Publications by Publication ID
 */
export async function deletePublicationsByPublicationId(
  publicationId: string
): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(publicationId)}`,
    {
      method: "DELETE",
    }
  );
}
