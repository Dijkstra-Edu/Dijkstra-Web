
import { apiCall } from "@/services/CoreApiService";
import type {
  GetAuthDataResponse,
  GetUserBasicResponse,
  GetUserSideCardResponse,
} from "@/types/server/dataforge/User/user";
import type { GetPersonalDetailsResponse } from "@/types/server/dataforge/User/profile";
import type { PersonalDetailsData } from "@/types/client/profile-section/profile-sections";
import { transformPersonalDetails } from "@/services/profile/transformers/transformers";

const USER_PATH = "Dijkstra/v1/u";

/**
 * Get user data by GitHub username
 */
export async function getUserByGithubUsername(
  username: string,
  allData: boolean = false
): Promise<GetUserBasicResponse> {
  return apiCall<GetUserBasicResponse>(
    "dataforge",
    `${USER_PATH}/${encodeURIComponent(username)}?all_data=${allData}`
  );
}

/**
 * Get Side Card Details by GitHub username
 */
export async function getSideCardDetailsByGithubUsername(
  username: string
): Promise<GetUserSideCardResponse> {
  return apiCall<GetUserSideCardResponse>(
    "dataforge",
    `${USER_PATH}/card/${encodeURIComponent(username)}`
  );
}

/**
 * Get Auth Data by GitHub username
 */
export async function getAuthDataByGithubUsername(
  username: string
): Promise<GetAuthDataResponse> {
  return apiCall<GetAuthDataResponse>(
    "dataforge",
    `${USER_PATH}/auth/${encodeURIComponent(username)}`
  );
}