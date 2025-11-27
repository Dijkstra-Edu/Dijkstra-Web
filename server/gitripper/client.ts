
/**
 * Get the Gitripper base URL from environment variables
 * @throws Error if NEXT_PUBLIC_GITRIPPER_SERVICE_URL is not set
 */
export function getGitripperBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_GITRIPPER_SERVICE_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_GITRIPPER_SERVICE_URL environment variable is not set');
    }
    return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
}

// Convert timeRange to date range
function getDateRange(timeRange: string) {
  const end = new Date()
  const start = new Date()

  const days =
    timeRange === "7d" ? 7 :
    timeRange === "30d" ? 30 : 90

  start.setDate(end.getDate() - days)

  return {
    startTime: start.toISOString().slice(0, 10),
    endTime: end.toISOString().slice(0, 10),
  }
}

type ApiCommit = {
  date: string
  commitCount: number
}

type ApiResponse = {
  commitsByDate: ApiCommit[]
}

export async function getGithubCommitInformationByDates(
  startDate: string,
  endDate: string,
  loginId: string
): Promise<{ date: string; Github: number }[]> {

  const url = getGitripperBaseUrl() + `/userCommitData/${loginId}/${startDate}/${endDate}`
  console.log("Fetching commits by date:", url)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch GitHub commits")
  }

  const raw: ApiResponse = await res.json()
  const commits = raw?.commitsByDate ?? []

  return normalizeMissingDates(commits, startDate, endDate)
}


export async function getGithubCommitInformation(
  timeRange: string,
  loginId: string
): Promise<{ date: string; Github: number }[]> {

  const { startTime, endTime } = getDateRange(timeRange)

  const url = getGitripperBaseUrl() + `/userCommitData/${loginId}/${startTime}/${endTime}`
  console.log("Fetching commits:", url)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch GitHub commits")
  }

  const raw: ApiResponse = await res.json()
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
