// Profile utility functions

import { CAREER_PATHS, type CareerPathKey } from '@/data/career-paths';

/**
 * Format months into a human-readable time display
 */
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

/**
 * Group career paths by faction
 */
export const groupCareerPathsByFaction = (careerPaths: typeof CAREER_PATHS) => {
  return Object.entries(careerPaths).reduce((acc, [key, path]) => {
    const faction = path.faction || "Other";
    if (!acc[faction]) acc[faction] = [];
    acc[faction].push([key, path]);
    return acc;
  }, {} as Record<string, Array<[string, typeof CAREER_PATHS[keyof typeof CAREER_PATHS]]>>);
};

/**
 * Calculate experience duration between two dates
 */
export const calculateExperience = (startDate: string | Date, endDate: string | Date | null, isCurrent: boolean): string => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = isCurrent ? new Date() : (endDate ? (typeof endDate === 'string' ? new Date(endDate) : endDate) : new Date());
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  // Calculate total months
  let totalMonths = years * 12 + months;
  
  // If we're still in the same month or earlier in the current month, subtract 1
  if (end.getDate() < start.getDate()) {
    totalMonths--;
  }
  
  // Convert back to years and months
  const finalYears = Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;
  
  if (finalYears === 0) {
    return finalMonths === 1 ? "1 month" : `${finalMonths} months`;
  } else if (finalMonths === 0) {
    return finalYears === 1 ? "1 year" : `${finalYears} years`;
  } else {
    return `${finalYears} year${finalYears !== 1 ? 's' : ''}, ${finalMonths} month${finalMonths !== 1 ? 's' : ''}`;
  }
};

/**
 * Format date for display
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short" 
  });
};

/**
 * Format date range for display
 */
export const formatDateRange = (startDate: string | Date, endDate: string | Date | null, isCurrent: boolean): string => {
  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : (endDate ? formatDate(endDate) : "Present");
  return `${start} - ${end}`;
};

/**
 * Get proficiency label based on score
 */
export const getProficiencyLabel = (proficiency: number): string => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 80) return "Advanced";
  if (proficiency >= 70) return "Intermediate";
  if (proficiency >= 60) return "Beginner";
  return "Learning";
};

/**
 * Get proficiency color class
 */
export const getProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 90) return "text-green-600";
  if (proficiency >= 80) return "text-blue-600";
  if (proficiency >= 70) return "text-yellow-600";
  if (proficiency >= 60) return "text-orange-600";
  return "text-gray-600";
};

/**
 * Get experience color class based on years
 */
export const getExperienceColor = (years: number): string => {
  if (years >= 8) return "bg-black border-2 border-yellow-500 text-yellow-500";
  if (years >= 6) return "bg-purple-500 text-white";
  if (years >= 4) return "bg-red-500 text-white";
  if (years >= 2) return "bg-orange-500 text-white";
  if (years >= 1) return "bg-yellow-500 text-black";
  return "bg-green-700 text-white";
};

/**
 * Parse comma-separated skills string
 */
export const parseSkillsString = (skillsString: string): string[] => {
  return skillsString
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Get current timestamp
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Convert month/year numbers to a Date object
 */
export const monthYearToDate = (month: number, year: number): Date => {
  return new Date(year, month - 1, 1); // month is 0-indexed in Date constructor
};

/**
 * Convert Date object to month/year numbers
 */
export const dateToMonthYear = (date: Date): { month: number; year: number } => {
  return {
    month: date.getMonth() + 1, // Convert to 1-indexed
    year: date.getFullYear(),
  };
};

/**
 * Format month/year numbers to display string
 */
export const formatMonthYear = (month: number, year: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[month - 1]} ${year}`;
};

/**
 * Format month/year range for display
 */
export const formatMonthYearRange = (
  startMonth: number, 
  startYear: number, 
  endMonth?: number, 
  endYear?: number, 
  isCurrent?: boolean
): string => {
  const start = formatMonthYear(startMonth, startYear);
  const end = isCurrent ? 'Present' : (endMonth && endYear ? formatMonthYear(endMonth, endYear) : 'Present');
  return `${start} - ${end}`;
};

/**
 * Generic interface for objects with date-based sorting
 */
export interface DateSortable {
  startDateMonth: number;
  startDateYear: number;
  endDateMonth?: number;
  endDateYear?: number;
  currentlyWorking?: boolean;
}

/**
 * Sort an array of objects by their end date (most recent first)
 * Generic function that works with any object implementing DateSortable interface
 */
export const sortByEndDate = <T extends DateSortable>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    // Helper function to get the effective end date for sorting
    const getEndDate = (item: T): Date => {
      if (item.currentlyWorking) {
        return new Date(); // Current date for ongoing positions
      }
      if (item.endDateYear && item.endDateMonth) {
        return new Date(item.endDateYear, item.endDateMonth - 1, 1);
      }
      // Fallback to start date if no end date
      return new Date(item.startDateYear, item.startDateMonth - 1, 1);
    };

    const endDateA = getEndDate(a);
    const endDateB = getEndDate(b);

    // Sort by end date (most recent first)
    return endDateB.getTime() - endDateA.getTime();
  });
};