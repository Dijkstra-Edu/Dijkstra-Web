import { apiCall } from "@/services/CoreApiService";
import type {
  CheckOnboardingStatusResponse,
  OnboardUserRequest,
  OnboardUserResponse,
} from "@/types/server/dataforge/User/user";

const ONBOARD_PATH = "Dijkstra/v1/u/onboard";

/**
 * Check onboarding status for a username
 */
export async function checkOnboardingStatus(
  username: string
): Promise<CheckOnboardingStatusResponse> {
  return apiCall<CheckOnboardingStatusResponse>(
    "dataforge",
    `${ONBOARD_PATH}?username=${encodeURIComponent(username)}`
  );
}

/**
 * Submit onboarding data
 */
export async function submitOnboarding(
  data: OnboardUserRequest
): Promise<OnboardUserResponse> {
  return apiCall<OnboardUserResponse>("dataforge", ONBOARD_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
