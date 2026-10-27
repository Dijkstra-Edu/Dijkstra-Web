import {
  transformProjectForRead,
  transformProjectArrayForRead,
  transformProjectToRequest,
  transformProjectUpdateRequest,
  transformProjectForWriteOps,
} from "./transformers/transformers";
import { CreateProjectsData, ReadProjectsData } from "@/types/client/profile-section/profile-sections";
import { GetProjectResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/projects";

/**
 * Get Projects by GitHub username
 */
export async function getProjectsByGithubUsername(
  username: string
): Promise<ReadProjectsData[]> {
  const response = await apiCall<GetProjectResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  const transformedResponse =  transformProjectArrayForRead(response);
  console.log("Printing transformed response");
  console.log(transformedResponse);
  return transformedResponse;
}

/**
 * Add Project by GitHub username
 */
export async function addProjectByGithubUsername(
  username: string,
  data: Omit<CreateProjectsData, "id" | "createdAt" | "updatedAt">
): Promise<CreateProjectsData> {
  const request = transformProjectToRequest(data, username);
  const response = await apiCall<GetProjectResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformProjectForWriteOps(response);
}

/**
 * Update Project by Project ID
 */
export async function updateProjectByProjectId(
  projectId: string,
  data: Partial<CreateProjectsData>,
): Promise<CreateProjectsData> {
  const request = transformProjectUpdateRequest(data);
  const response = await apiCall<GetProjectResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(projectId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformProjectForWriteOps(response);
}

/**
 * Delete Project by Project ID
 */
export async function deleteProjectByProjectId(projectId: string): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(projectId)}`,
    {
      method: "DELETE",
    }
  );
}
