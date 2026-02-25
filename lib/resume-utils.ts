/**
 * Utility functions for Resume and CV components
 */

import { LocationResponse } from "@/types/server/dataforge/User/full-profile";

/**
 * Format location object to string
 * Handles both string locations and LocationResponse objects
 */
export const formatLocation = (
  location: string | { city?: string; state?: string; country?: string } | LocationResponse | unknown
): string => {
  if (!location) return '';
  if (typeof location === 'string') return location;
  if (typeof location === 'object' && location !== null) {
    const loc = location as { city?: string; state?: string; country?: string };
    const parts = [loc.city, loc.state, loc.country].filter(Boolean);
    return parts.join(', ');
  }
  return '';
};

/**
 * Format date from month/year to readable string
 */
export const formatDate = (month?: number, year?: number): string => {
  if (!year) return "";
  if (!month) return String(year);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[month - 1]} ${year}`;
};

/**
 * Parse comma-separated string into array
 */
export const handleStringArrayInput = (value: string): string[] => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};
