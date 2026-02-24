import {
  transformProject,
  transformProjectArray,
  transformProjectToRequest,
  transformProjectUpdateRequest,
} from "./transformers/transformers";
import { ProjectsData } from "@/types/client/profile-section/profile-sections";
import { GetProjectResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/projects";

/**
 * Get Projects by GitHub username
 */
export async function getProjectsByGithubUsername(
  username: string
): Promise<ProjectsData[]> {
  const response = await apiCall<GetProjectResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformProjectArray(response);
}

/**
 * Add Project by GitHub username
 */
export async function addProjectByGithubUsername(
  data: Omit<ProjectsData, "id" | "createdAt" | "updatedAt">
): Promise<ProjectsData> {
  const request = transformProjectToRequest(data);
  const response = await apiCall<GetProjectResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformProject(response);
}

/**
 * Update Project by Project ID
 */
export async function updateProjectByProjectId(
  projectId: string,
  data: Partial<ProjectsData>
): Promise<ProjectsData> {
  const request = transformProjectUpdateRequest(data);
  const response = await apiCall<GetProjectResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(projectId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformProject(response);
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
