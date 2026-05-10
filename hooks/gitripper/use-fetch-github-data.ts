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
          { subject: "Commits", value: stats.totalCommits, fullMark: 100 },
          { subject: "Pull requests", value: stats.totalPullRequests, fullMark: 100 },
          { subject: "Issues", value: stats.totalIssues, fullMark: 100 },
          { subject: "Code review", value: stats.totalCodeReviews, fullMark: 100 },
        ];
        const githubActivityRadarMax = Math.max(
          ...githubActivityRadar.map((d) => d.value),
          1
        );
        const githubActivityRadarScaled = githubActivityRadar.map((d) => ({
          ...d,
          value: Math.round((d.value / githubActivityRadarMax) * 100),
          fullMark: 100,
        }));

        return {
          githubActivityRadarScaled: githubActivityRadarScaled,
          githubAllTimeStats: stats,
          githubActivityRadar: githubActivityRadar
        };
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}