import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { OnboardUserRequest } from "../user";
import { submitOnboarding, checkOnboardingStatus, getPersonalDetailsByGithubUsername, getUserByGithubUsername, getSideCardDetailsByGithubUsername, updatePersonalDetailsByGithubUsername, getWorkExperienceByGithubUsername } from "../user";
import { PersonalDetailsData } from "@/types/client/profile-section/profile-sections";


export const onboardUserMutation = mutationOptions({
    mutationFn: (data: OnboardUserRequest) => submitOnboarding(data),
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

export const getUserSideCardQuery = (username: string) => queryOptions({
    queryKey: ['user-side-card', username],
    queryFn: () => getSideCardDetailsByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
});

export const getPersonalDetailsQuery = (username: string) => queryOptions({
    queryKey: ['personal-details', username],
    queryFn: () => getPersonalDetailsByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
});

export const updatePersonalDetailsMutation = mutationOptions({
    mutationFn: ({ username, data }: { username: string; data: Partial<PersonalDetailsData> }) => 
        updatePersonalDetailsByGithubUsername(username, data),
});

export const getWorkExperienceQuery = (username: string) => queryOptions({
    queryKey: ['work-experience', username],
    queryFn: () => getWorkExperienceByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
});

