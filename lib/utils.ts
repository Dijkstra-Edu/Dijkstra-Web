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

// Helper function to format months into years and months
export const formatTimeDisplay = (months: number): string => {
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};


export function buildPathWithParams(
  basePath: string,
  params?: Map<string, string>
): string {
  if (!params || params.size === 0) {
    return basePath;
  }

  const searchParams = new URLSearchParams();

  params.forEach((value, key) => {
    searchParams.append(key, value);
  });

  return `${basePath}?${searchParams.toString()}`;
}
