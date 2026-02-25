import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert timeRange to date range
export function getDateRange(timeRange: string) {
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

export function getYearRange(year: number) {
    const start = new Date(year, 0, 1)
    const end = new Date(year, 11, 31)
    return {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    }
}