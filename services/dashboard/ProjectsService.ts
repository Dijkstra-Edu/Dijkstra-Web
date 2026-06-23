import { apiCall } from "../CoreApiService";
import { Project } from "@/types/client/opportunities/opportunities-types";
import { buildPathWithParams } from "@/lib/utils";

import { PaginatedProject, ProjectDto, ProjectFilterHelpers, ProjectFilterHelpersResponseDto } from "@/types/server/dataforge/OSProject/project";
import { Difficulty } from "@/types/server/dataforge/enums";

export async function getProjects(params: Map<string, string>): Promise<[Project[], number]> {
  const path = buildPathWithParams(`Dijkstra/v1/projects/opportunities`, params);
  console.log("Fetching project listings:", path);
  const raw = await apiCall<PaginatedProject>("dataforge", path);
  const result = raw.projects.map(convertToProject);
console.log("Fetching project listings for params:", params);
  console.log("Fetched project listings:", result);
  return [result, raw.total];
}

export async function getProjectFilterHelpers(): Promise<ProjectFilterHelpers> {
  const path = `Dijkstra/v1/projects/opportunities/filter_helpers`;
  console.log("Fetching project filter helpers:", path);
  const raw = await apiCall<ProjectFilterHelpersResponseDto>("dataforge", path);
  console.log("Raw project filter helpers response:", raw);
  const result = convertToFilterHelpers(raw);
  console.log("Fetched project filter helpers:", result);
  return result;
}

    const convertToFilterHelpers = (response: ProjectFilterHelpersResponseDto): ProjectFilterHelpers => {
        return {
            languages: response.languages,
            difficulties: response.difficulties.map(formatDifficulty),
            categories: response.categories,
            licenses: response.licenses
        }
    }



const formatDifficulty = (difficulty?: Difficulty): Project["difficulty"] => {
    if (difficulty === Difficulty.EASY) return "beginner";
    if (difficulty === Difficulty.MEDIUM) return "intermediate";
    if (difficulty === Difficulty.HARD) return "advanced";
    if (difficulty === Difficulty.EXTREME) return "advanced";
    return "beginner";
}


const convertToProject = (project: ProjectDto): Project => {
  return {
   id: project.id,
    title: project.title || "",
    repository: project.repository || "",
    language: project.languages && project.languages.length > 0 ? project.languages[0] : "Unknown",
    stars: project.stars || 0,
    forks: project.forks || 0,
    lastUpdated: project.last_updated || "",
    topics: project.topics || [],
    difficulty: formatDifficulty(project.difficulty ? project.difficulty : Difficulty.EASY),
    issuesCount: project.issues_count || 0,
    contributorsCount: project.contributors_count || 0,
    license: project.license || "Unknown",
    organization: project.organization,
    organizationLogo: project.organization_logo || "",
    heroImage: project.hero_image || "",
    description: project.description || "",
    featured: project.featured || false,
    highlight: project.highlight as Project["highlight"] || undefined,
    category: project.category && project.category.length > 0 ? project.category[0] : "Uncategorized",
    readme : project.readme || "No readme provided"
  };
};