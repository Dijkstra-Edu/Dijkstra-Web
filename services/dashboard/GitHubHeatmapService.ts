import { GITRIPPER_API_URLS } from "@/lib/api/url-builders";
import { getDateRange } from "@/lib/utils";
import { AggregatedCommits } from "@/types/server/gitripper/commit_data";

export async function getGithubCommitInformationByDates(
  startDate: string,
  endDate: string,
  loginId: string
): Promise<{ date: string; Github: number }[]> {

  const url = GITRIPPER_API_URLS.getGithubCommitInformationByDatesUrl(startDate, endDate, loginId)
  console.log("Fetching commits by date:", url)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch GitHub commits")
  }

  const raw: AggregatedCommits = await res.json()
  const commits = raw?.commitsByDate ?? []

  return normalizeMissingDates(commits, startDate, endDate)
}


export async function getGithubCommitInformation(
  timeRange: string,
  loginId: string
): Promise<{ date: string; Github: number }[]> {

  const { startTime, endTime } = getDateRange(timeRange)

  const url = GITRIPPER_API_URLS.getGithubCommitInformationUrl(timeRange, loginId)
  console.log("Fetching commits:", url)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch GitHub commits")
  }

  const raw: AggregatedCommits = await res.json()
  console.log("Raw commit data:", raw)
  const commits = raw?.commitsByDate ?? []

  return normalizeMissingDates(commits, startTime, endTime)
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
