import { getJobFilterHelpers } from "@/services/dashboard/OpportunitiesService";
import { useQuery } from "@tanstack/react-query";

export function useFetchJobFilterHelpers() {
  return useQuery({
    queryKey: ["job-filter-helpers"],
    queryFn: async () => {
        return getJobFilterHelpers()
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}