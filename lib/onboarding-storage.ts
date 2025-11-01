/**
 * LocalStorage utilities for onboarding data persistence
 * Handles versioning, error handling, and safe serialization
 */

const STORAGE_KEY = "dijkstra-onboarding-state";
const STORAGE_VERSION = 1;

export interface OnboardingFormData {
  gitSetup: boolean | null;
  cliKnowledge: boolean | null;
  discordJoined: boolean | null;
  leetcodeHandle: string;
  linkedinHandle: string;
  primarySpecialization: string;
  secondarySpecializations: string[];
  timeToUpskill: number;
  expectedSalary: string;
  selectedTools: string[];
  dreamCompany: string;
  dreamRole: string;
}

interface StoredOnboardingData {
  version: number;
  data: OnboardingFormData;
  timestamp: number;
}

/**
 * Safely save onboarding data to localStorage
 */
export function saveOnboardingData(data: OnboardingFormData): boolean {
  try {
    const storageData: StoredOnboardingData = {
      version: STORAGE_VERSION,
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
  } catch (error) {
    console.error("Error saving onboarding data to localStorage:", error);
    return false;
  }
}

/**
 * Safely load onboarding data from localStorage
 */
export function loadOnboardingData(): OnboardingFormData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: StoredOnboardingData = JSON.parse(stored);

    // Handle version migrations if needed in future
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(`Storage version mismatch. Expected ${STORAGE_VERSION}, got ${parsed.version}`);
      // Could implement migration logic here
    }

    return parsed.data;
  } catch (error) {
    console.error("Error loading onboarding data from localStorage:", error);
    return null;
  }
}

/**
 * Clear onboarding data from localStorage
 */
export function clearOnboardingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing onboarding data from localStorage:", error);
  }
}

/**
 * Check if onboarding data exists in localStorage
 */
export function hasOnboardingData(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

