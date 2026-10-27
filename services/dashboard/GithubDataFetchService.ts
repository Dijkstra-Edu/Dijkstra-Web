import { getDateRange } from "@/lib/utils";
import { AggregatedCommits } from "@/types/server/gitripper/commit_data";
import { apiCall } from "@/services/CoreApiService";
import { OwnerRepositoryContributionDto } from "@/types/server/gitripper/repo_contribution";
import { GithubStatDto } from "@/types/server/gitripper/all_time_stats";
import { GithubProfileDto } from "@/types/server/gitripper/profile";

/** Backend path for Gitripper commit data (used with apiCall so generic /api/[...path] proxies to Gitripper). */
const GITRIPPER_COMMIT_PATH = "userCommitData";

export async function getLatestContributions(
  username: string
): Promise<OwnerRepositoryContributionDto[]> {
  const path = `${encodeURIComponent(username)}/contributions/latest?count=5`;
  const raw = await apiCall<OwnerRepositoryContributionDto[]>("gitripper", path);
  return raw;
}

export async function getGithubProfileInfo(
  username: string
): Promise<GithubProfileDto> {
  const path = `${encodeURIComponent(username)}/profile/info`;
  const raw = await apiCall<GithubProfileDto>("gitripper", path);
  return raw;
}


export async function getAllTimeGithubStats(
  username: string
): Promise<GithubStatDto> {
  const path = `${encodeURIComponent(username)}/stats/counts`;
  const raw = await apiCall<GithubStatDto>("gitripper", path);
  return raw;
}

export async function getGithubCommitInformationByDates(
  startDate: string,
  endDate: string,
  username: string
): Promise<{ date: string; Github: number }[]> {
  const path = `${GITRIPPER_COMMIT_PATH}/${encodeURIComponent(username)}/${startDate}/${endDate}`;
  const raw = await apiCall<AggregatedCommits>("gitripper", path);
  const commits = raw?.commitsByDate ?? [];

  return normalizeMissingDates(commits, startDate, endDate);
}

export async function getGithubCommitInformation(
  timeRange: string,
  username: string
): Promise<{ date: string; Github: number }[]> {
  const { startTime, endTime } = getDateRange(timeRange);
  const path = `${GITRIPPER_COMMIT_PATH}/${encodeURIComponent(username)}/${startTime}/${endTime}`;
  const raw = await apiCall<AggregatedCommits>("gitripper", path);
  const commits = raw?.commitsByDate ?? [];

  return normalizeMissingDates(commits, startTime, endTime);
}

function normalizeMissingDates(
  data: { date: string; commitCount: number }[],
  start: string,
  end: string
): { date: string; Github: number }[] {

  const map = new Map<string, number>()

  for (const item of data) {
    map.set(item.date, item.commitCount)
  }

  const result: { date: string; Github: number }[] = []

  const cur = new Date(start)
  const endDate = new Date(end)

  while (cur <= endDate) {
    const date = cur.toISOString().slice(0, 10)

    result.push({
      date,
      Github: map.get(date) ?? 0
    })

    cur.setDate(cur.getDate() + 1)
  }

  return result
}
