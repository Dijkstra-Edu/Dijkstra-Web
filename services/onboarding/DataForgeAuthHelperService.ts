import { apiCall } from "@/services/CoreApiService";
import type {
  CheckOnboardingStatusResponse,
  GetAuthDataResponse,
  OnboardUserRequest,
  OnboardUserResponse,
} from "@/types/server/dataforge/User/user";

const ONBOARD_PATH = "Dijkstra/v1/u/onboard";
const USER_PATH = "Dijkstra/v1/u";

/**
 * Check onboarding status for a username
 */
export async function checkOnboardingStatus(
  username: string,
  isFromServer: boolean = false
): Promise<CheckOnboardingStatusResponse> {
  return apiCall<CheckOnboardingStatusResponse>(
    "dataforge",
    `${ONBOARD_PATH}?username=${encodeURIComponent(username)}`,
    undefined,
    isFromServer
  );
}

/**
 * Submit onboarding data
 */
export async function submitOnboarding(
  data: OnboardUserRequest,
  isFromServer: boolean = false
): Promise<OnboardUserResponse> {
  return apiCall<OnboardUserResponse>("dataforge", ONBOARD_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  }, isFromServer);
}

/**
 * Get Auth Data by GitHub username
 */
export async function getAuthDataByGithubUsername(
  username: string,
  isFromServer: boolean = false
): Promise<GetAuthDataResponse> {
  return apiCall<GetAuthDataResponse>(
    "dataforge",
    `${USER_PATH}/auth/${encodeURIComponent(username)}`,
    undefined,
    isFromServer
  );
}