import { getLeetCodeStatistics } from "@/services/dashboard/LeetCodeDataFetchService";
import { useQuery } from "@tanstack/react-query";

export function useFetchLeetCodeData(
  leetcodeUsername: string
) {
    return useQuery({
        queryKey: ["leetcode-statistics", leetcodeUsername],
        queryFn: () => getLeetCodeStatistics(leetcodeUsername),
        enabled: !!leetcodeUsername,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
  });
}