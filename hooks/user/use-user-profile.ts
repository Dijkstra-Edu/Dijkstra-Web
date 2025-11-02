/**
 * Custom hooks for user profile data
 * Used primarily for Resume Builder and profile-related features
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFullUserProfileQuery } from '@/server/dataforge/User/QueryOptions/user.queryOptions';
import { userQueryKeys } from '@/lib/user/query-keys';
import { GetFullUserProfileResponse } from '@/types/server/dataforge/User/full-profile';

/**
 * Hook to fetch full user profile data (including all nested sections)
 * Used by Resume Builder to populate all form fields
 * 
 * @param githubUsername - GitHub username to fetch profile for
 * @returns Query result with full user profile data
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFullUserProfile('test_user_123');
 * 
 * if (isLoading) return <Spinner />;
 * if (error) return <Error message={error.message} />;
 * 
 * // Use data to populate resume
 * console.log(data.first_name, data.profile.education);
 * ```
 */
export function useFullUserProfile(githubUsername: string) {
  return useQuery({
    ...getFullUserProfileQuery(githubUsername),
    // Additional error handling
    throwOnError: false,
  });
}

/**
 * Hook to prefetch full user profile data
 * Useful for optimizing user experience by loading data before it's needed
 * 
 * @example
 * ```tsx
 * const prefetchProfile = usePrefetchFullUserProfile();
 * 
 * <button onMouseEnter={() => prefetchProfile('test_user_123')}>
 *   Open Resume
 * </button>
 * ```
 */
export function usePrefetchFullUserProfile() {
  const queryClient = useQueryClient();

  return (githubUsername: string) => {
    queryClient.prefetchQuery(getFullUserProfileQuery(githubUsername));
  };
}

/**
 * Hook to invalidate user profile cache
 * Call this after updating user profile data to force a refetch
 * 
 * @example
 * ```tsx
 * const invalidateProfile = useInvalidateFullUserProfile();
 * 
 * const handleSave = async () => {
 *   await saveUserProfile(data);
 *   invalidateProfile('test_user_123');
 * };
 * ```
 */
export function useInvalidateFullUserProfile() {
  const queryClient = useQueryClient();

  return (githubUsername: string) => {
    queryClient.invalidateQueries({
      queryKey: userQueryKeys.byGithubFull(githubUsername),
    });
  };
}

/**
 * Hook to get cached user profile data without triggering a fetch
 * Useful for reading data that should already be cached
 * 
 * @example
 * ```tsx
 * const getCachedProfile = useGetCachedFullUserProfile();
 * const cachedData = getCachedProfile('test_user_123');
 * ```
 */
export function useGetCachedFullUserProfile() {
  const queryClient = useQueryClient();

  return (githubUsername: string): GetFullUserProfileResponse | undefined => {
    return queryClient.getQueryData(userQueryKeys.byGithubFull(githubUsername));
  };
}
