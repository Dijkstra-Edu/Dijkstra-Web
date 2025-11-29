export type DateCommit = {
  date: string
  commitCount: number
}

export type AggregatedCommits = {
  commitsByDate: DateCommit[]
}
