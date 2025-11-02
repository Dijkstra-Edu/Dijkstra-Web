/**
 * TanStack Query keys factory for user-related queries
 * Centralized query key management following best practices
 */

export const userQueryKeys = {
  // All user queries
  all: ['user'] as const,
  
  // User by GitHub username queries
  byGithub: (username: string) => [...userQueryKeys.all, 'github', username] as const,
  byGithubBasic: (username: string) => [...userQueryKeys.byGithub(username), 'basic'] as const,
  byGithubFull: (username: string) => [...userQueryKeys.byGithub(username), 'full'] as const,
  
  // User side card
  sideCard: (username: string) => [...userQueryKeys.all, 'side-card', username] as const,
  
  // Personal details
  personalDetails: (username: string) => [...userQueryKeys.all, 'personal-details', username] as const,
  
  // Auth data
  authData: (username: string) => [...userQueryKeys.all, 'auth', username] as const,
  
  // Onboarding status
  onboardingStatus: (username: string) => [...userQueryKeys.all, 'onboarding-status', username] as const,
} as const;
