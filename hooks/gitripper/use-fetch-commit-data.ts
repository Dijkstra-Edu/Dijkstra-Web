  import { useQuery } from "@tanstack/react-query";

export function useFetchGithubCommitDataByTimeRange(timeRange: string) {
    return useQuery({
        queryKey: ["github-activity", timeRange],
        queryFn: async () => {
            const res = await fetch(`/api/gitripper?range=${timeRange}`)
            if (!res.ok) throw new Error("Failed to load Gitripper data")
            return res.json()
        },
        staleTime: 1000 * 60 * 5,
  });

}

export function useFetchGithubCommitDataByDateRange(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ["github-activity", startDate, endDate],
        queryFn: async () => {
            const res = await fetch(`/api/gitripper?start=${startDate}&end=${endDate}`)
            if (!res.ok) throw new Error("Failed to load Gitripper data")
            return res.json()
        },
        staleTime: 1000 * 60 * 5,
  });

}