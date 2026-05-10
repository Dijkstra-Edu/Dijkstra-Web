import { useQuery } from "@tanstack/react-query";
import {
  getAllTimeGithubStats,
  getGithubCommitInformation,
  getGithubCommitInformationByDates,
  getLatestContributions,
} from "@/services/dashboard/GithubDataFetchService";
import { get } from "http";
import { github } from "better-auth";

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

export function useFetchLatestContributions(
  username: string
) {
  return useQuery({
    queryKey: ["github-activity", username],
    queryFn: async () => getLatestContributions(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFetchAllTimeGithubStats(
  username: string
) {
  return useQuery({
          queryKey: ["github-all-time-stats", username],
          queryFn: async () => {
            const stats = await getAllTimeGithubStats(username);
            const githubActivityRadar = [
              { subject: "Commits", value: stats.totalCommits },
              { subject: "Pull requests", value: stats.totalPullRequests },
              { subject: "Issues", value: stats.totalIssues },
              { subject: "Code review", value: stats.totalCodeReviews },
            ];

            const total = githubActivityRadar.reduce(
              (sum, item) => sum + item.value,
              0
            );

            const githubActivityRadarScaled = githubActivityRadar.map((d) => ({
              ...d,
              value:
                total === 0
                  ? 0
                  : Math.round((d.value / total) * 100),
              fullMark: total,
            }));

            return {
              githubActivityRadarScaled,
              githubAllTimeStats: stats,
            };
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}