import { Projects } from "@/components/projects";
import { getProjects } from "@/services/dashboard/ProjectsService";
import { Difficulty } from "@/types/server/dataforge/enums";
import { useQuery } from "@tanstack/react-query";

export function useFetchProjectsByCategory( category?: string, limit: string = "20") {
  return useQuery({
    queryKey: ["projects", category, limit],
    queryFn: async () => {
        const params = new Map();
        params.set("limit", limit); // TODO: This is an issue with caching fix it later, we want to cache by category but if we set a limit here it will always return 20 results and if we change the limit it will create a new cache entry
        params.set("enrich_readme",true)
        if (category == "featured") {
            params.set("featured", "true");
        } else if (category){
            params.set("category", category );
        }
        const [jobs, total] = await getProjects(params);
        return jobs;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useFetchProjectsFiltered(titleFilter?: string, languageFilter?: string, categoryFilter?: string, difficultyFilter?: string, licenseFilter?: string, limit: string = "20", page: string = "1") {
  return useQuery({
    queryKey: ["projects", titleFilter, languageFilter, categoryFilter, difficultyFilter, licenseFilter, limit, page],
    queryFn: async () => {
        const params = new Map();
        params.set("limit", limit); // TODO: This is an issue with caching fix it later, we want to cache by category but if we set a limit here it will always return 20 results and if we change the limit it will create a new cache entry
        params.set("page", page);
        if (titleFilter) {
            params.set("title", titleFilter);
        }
        if (languageFilter) {
            params.set("language", languageFilter);
        }
        if (categoryFilter) {
            params.set("category", categoryFilter);
        }
        if (difficultyFilter) {
            params.set("difficulty", formatDifficulty(difficultyFilter));
        }
        if (licenseFilter) {
            params.set("license", licenseFilter);
        }
        return getProjects(params);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
const formatDifficulty = (difficulty?:string): string => {
    if (difficulty === "beginner") return "EASY";
    if (difficulty === "intermediate") return "MEDIUM";
    if (difficulty === "advanced") return "HARD";
    return "EASY";
}

