import { getProjectFilterHelpers } from "@/services/dashboard/ProjectsService";
import { useQuery } from "@tanstack/react-query";

export function useFetchProjectFilterHelpers() {
  return useQuery({
    queryKey: ["project-filter-helpers"],
    queryFn: async () => {
        return getProjectFilterHelpers()
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}