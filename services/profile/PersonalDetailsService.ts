import {
  transformPersonalDetails,
  transformPersonalDetailsUpdateRequest,
} from "./transformers/transformers";
import { PersonalDetailsData } from "@/types/client/profile-section/profile-sections";
import { GetPersonalDetailsResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const PERSONAL_DETAILS_PATH = "Dijkstra/v1/u/personal-details";

/**
 * Get Personal Details by GitHub username
 */
export async function getPersonalDetailsByGithubUsername(
  username: string
): Promise<PersonalDetailsData> {
  const response = await apiCall<GetPersonalDetailsResponse>(
    "dataforge",
    `${PERSONAL_DETAILS_PATH}/${encodeURIComponent(username)}`
  );
  return transformPersonalDetails(response);
}

/**
 * Update Personal Details by GitHub username
 */
export async function updatePersonalDetailsByGithubUsername(
  username: string,
  data: Partial<PersonalDetailsData>
): Promise<PersonalDetailsData> {
  const request = transformPersonalDetailsUpdateRequest(data);
  const response = await apiCall<GetPersonalDetailsResponse>(
    "dataforge",
    `${PERSONAL_DETAILS_PATH}/${encodeURIComponent(username)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformPersonalDetails(response);
}
