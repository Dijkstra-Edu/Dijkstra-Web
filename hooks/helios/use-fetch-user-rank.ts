import { fetchUserRank } from "@/services/dashboard/HeliosDataFetchService";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserRank(
  userName: string
) {
    return useQuery({
        queryKey: ["user-rank", userName],
        queryFn: () => fetchUserRank(userName),
        enabled: !!userName,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
  });
}