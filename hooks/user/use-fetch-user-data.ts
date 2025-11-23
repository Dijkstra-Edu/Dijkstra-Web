import { useQuery } from "@tanstack/react-query";
import { UserApiService } from "@/services/UserApiService";
import { GetFullUserProfileResponse } from "@/types/server/dataforge/User/full-profile";

export function useFetchUserData(githubUsername: string, enabled: boolean = true) {
  return useQuery<GetFullUserProfileResponse, Error>({
    queryKey: ["userData", githubUsername],
    queryFn: () => UserApiService.getUserByGithubUsername(githubUsername, true),
    enabled: enabled && !!githubUsername,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}
