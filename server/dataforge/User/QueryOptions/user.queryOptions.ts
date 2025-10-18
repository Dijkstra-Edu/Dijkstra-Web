import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { onboardUser, checkOnboardingStatus, getUserByGithubUsername } from "../user";
import type { OnboardUserRequest } from "@/types/server/dataforge/User/user";

export const onboardUserMutation = mutationOptions({
    mutationFn: (data: OnboardUserRequest) => onboardUser(data),
});

export const checkOnboardingStatusQuery = (username: string) => queryOptions({
    queryKey: ['onboarding-status', username],
    queryFn: () => checkOnboardingStatus(username),
    enabled: !!username,
});

export const getUserQuery = (username: string, allData: boolean = false) => queryOptions({
    queryKey: ['user', username, allData],
    queryFn: () => getUserByGithubUsername(username, allData),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
});

