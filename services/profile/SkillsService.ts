import { SkillsData } from "@/types/client/profile-section/profile-sections";
import { apiCall } from "../CoreApiService";

const SKILLS_PATH = "Dijkstra/v1/skills";

/**
 * Get Skills by GitHub username
 */
export async function getSkillsByGithubUsername(username: string): Promise<SkillsData[]> {
  const response = await apiCall<SkillsData[]>(
    "dataforge",
    `${SKILLS_PATH}/${encodeURIComponent(username)}`
  );
  return response;
}