import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { onboardUser, checkOnboardingStatus } from "../user";
import type { OnboardUserRequest } from "@/types/server/dataforge/User/user";

export const onboardUserMutation = mutationOptions({
    mutationFn: (data: OnboardUserRequest) => onboardUser(data),
});

export const checkOnboardingStatusQuery = (username: string) => queryOptions({
    queryKey: ['onboarding-status', username],
    queryFn: () => checkOnboardingStatus(username),
    enabled: !!username,
});

