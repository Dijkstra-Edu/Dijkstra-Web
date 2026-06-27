import {  getProjectIssues } from "@/services/dashboard/ProjectsService";
import { Project } from "@/types/client/opportunities/opportunities-types";
import { useQuery } from "@tanstack/react-query";

export function useFetchProjectOpenIssues(project : Project) {
  return useQuery({
    queryKey: ["project-issues", project.repository],
    queryFn: async () => {
      console.log("Fetching project issues")
      const issues = await getProjectIssues(project.repository);
      console.log("issues:"+issues)
      return issues;
    },
    enabled: !!project.repository,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
