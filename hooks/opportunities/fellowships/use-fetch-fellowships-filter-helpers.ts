import { getFellowshipFilterHelpers } from "@/services/dashboard/FellowshipsService";
import { useQuery } from "@tanstack/react-query";

export function useFetchFellowshipFilterHelpers() {
  return useQuery({
    queryKey: ["fellowships-filter-helpers"],
    queryFn: async () => {
        return getFellowshipFilterHelpers()
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}