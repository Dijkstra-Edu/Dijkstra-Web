import {  getProjectReadme } from "@/services/dashboard/ProjectsService";
import { Project } from "@/types/client/opportunities/opportunities-types";
import { useQuery } from "@tanstack/react-query";

export function useFetchProjectReadme(project : Project) {
  return useQuery({
    queryKey: ["project-readme", project.repository],
    queryFn: async () => {
      return await getProjectReadme(project.repository);
    },
    enabled: !!project.repository,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
