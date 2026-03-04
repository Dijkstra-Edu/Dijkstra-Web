import { useQuery } from "@tanstack/react-query";
import {
  getGithubCommitInformation,
  getGithubCommitInformationByDates,
} from "@/services/dashboard/GitHubHeatmapService";

export function useFetchGithubCommitDataByTimeRange(timeRange: string, username: string) {
  return useQuery({
    queryKey: ["github-activity", timeRange, username],
    queryFn: async () => getGithubCommitInformation(timeRange, username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFetchGithubCommitDataByDateRange(
  startDate: string,
  endDate: string,
  username: string
) {
  return useQuery({
    queryKey: ["github-activity", startDate, endDate, username],
    queryFn: async () => getGithubCommitInformationByDates(startDate, endDate, username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}